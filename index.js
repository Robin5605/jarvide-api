const express = require('express');
const app = express();
const port = 3030;

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const auth = require('./auth.js');

app.use(express.json());
app.use(auth)

function fileToJSON(file) {
    return ({
        fileID: file.fileID,
        fileName: file.filename,
        userID: file.userID,
        folder: file.folder,
        create_epoch: file.create_epoch,
        last_edit_epoch: file.last_edit_epoch,
        url: file.url,
    });
}

function warnToJSON(warn) {
    return({
        warnID: warn.warnID,
        userID: warn.userID,
        modID: warn.modID,
        reason: warn.reason,    
    });
}

function configToJSON(config) {
    return({
        guildID: config.guildID,
        calc: config.calc,
        github: config.github,
        file: config.file,
        codeblock: config.codeblock
    });
}

app.post('/file', async (req, res) => {
    let { userID, filename, url } = req.query;
    console.log(userID, filename, url)

    if (!userID) {
        res.status(404).send({
            "ERROR": "Missing userID in params."
        });

        return;
    } 
    
    if (!filename) {
        res.status(404).send({
            "ERROR": "Missing filename in params."
        });

        return;
    } 
    
    if (!url) {
        res.status(404).send({
            "ERROR": "Missing url in params."
        });

        return;
    }       

    userID = parseInt(userID);

    if(isNaN(userID)) {
        res.status(400).send({
            "ERROR": "userID must be an INTEGER."
        });

        return;
    }

    await prisma.files.create({
        data: {
            userID: userID,
            filename: filename,
            url: url
            
        }
    });

    res.sendStatus(200);
});

app.get('/files', async (req, res) => {
    let { userID } = req.query;
    console.log(userID) 

    if (!userID) {
        res.status(404).send({
            "ERROR": "Missing userID in URL parameters."
        });

        return;
    }

    userID = parseInt(userID);
    if(isNaN(userID)) {
        res.status(400).send({
            "ERROR": "userID must be an INTEGER."
        });

        return;
    }

    const files = await prisma.files.findMany({
        where: {
            userID: userID
        }
    })

    if(files.length === 0) {
        res.status(200).send({});
        return;
    }

    res.status(200).send(
        files.map(file => fileToJSON(file))
    );

    return;
});

app.get('/file', async (req, res) => {
    let { fileID } = req.query;

    if(!fileID) {
        res.status(404).send({
            "ERROR": "Missing fileID in URL parameters."
        });

        return;
    }

    const file = await prisma.files.findUnique({
        where: {fileID: fileID}
    });

    if(!file) {
        res.status(404).send({
            "ERROR": "Provided fileID was not found."
        });

        return;
    }

    res.status(200).send(
        fileToJSON(file)
    )
    
});

app.delete('/file', async (req, res) => {
    let { fileID } = req.query;

    if (!fileID) {
        res.status(404).send({
            "ERROR": "Missing fileID in URL parameters."
        });

        return;
    }

    try {
        await prisma.files.delete({
            where: {fileID: fileID}
        });

        res.sendStatus(200);
    } catch {
        res.status(404).send({
            "ERROR": "The file could not be deleted because it does not exist."
        });
    }

    return;
});

app.patch('/file', async (req, res) => {
    let { fileID, filename, url} = req.query;

    if (!fileID) {
        res.status(400).send({
            "ERROR": "Missing fileID in params."
        });

        return;
    } 

    if (!filename) {
        res.status(400).send({
            "ERROR": "Missing filename in params."
        });

        return;
    } 
    
    if (!url) {
        res.status(400).send({
            "ERROR": "Missing url in params."
        });

        return;
    }

    userID = parseInt(userID);

    if(isNaN(userID)) {
        res.status(400).send({
            "ERROR": "userID must be an INTEGER."
        });

        return;
    }

    try {
        await prisma.files.update({
            where: {
                fileID: fileID
            },
            
            data: {
                filename: filename,
                url: url
            }
        });
    } catch {
        res.status(404).send({
            "ERROR": "Provided fileID was not found."
        });

        return;
    }

    res.sendStatus(200);
});



app.get('/warns', async (req, res) => {
    let { userID } = req.query;

    if (!userID) {
        res.status(400).send({
            "ERROR": "Missing userID in URL parameters."
        });

        return;
    } 

    userID = parseInt(userID)
    if(isNaN(userID)) {
        res.status(400).send({
            "ERROR": "userID must be an INTEGER."
        });

        return;
    }

    const warns = await prisma.warns.findMany({
        where: {userID: userID}
    });

    if(warns.length === 0) {
        res.status(200).send({});
        return;
    }

    res.status(200).send(
        warns.map(warn => warnToJSON(warn))
    );

    return;

});

app.post('/warns', async (req, res) => {
    let { userID, modID, reason } = req.query;

    if(!userID) {
        res.status(400).send({
            "ERROR": "Missing userID in params"
        });
        return
    }

    if(!modID) {
        res.status(400).send({
            "ERROR": "Missing modID in params"
        });
        return
    }

    if(!reason) {
        res.status(400).send({
            "ERROR": "Missing reason in params"
        });
        return
    }

    userID = parseInt(userID);
    if(isNaN(userID)) {
        res.status(400).send({
            "ERROR": "userID must be an INTEGER."
        });

        return;
    }

    modID = parseInt(modID);
    if(isNaN(modID)) {
        res.status(400).send({
            "ERROR": "userID must be an INTEGER."
        });

        return;
    }

    await prisma.warns.create({
        data: { 
            userID: userID,
            modID: modID,
            reason: reason,
        }
    });

    res.sendStatus(200);

    return;

});

app.delete('/warns', async (req, res) => {
    let { warnID } = req.query;
    if(!warnID) {
        res.status(400).send({
            "ERROR": "Missing warnID in URL parameters."
        });

        return;
    }

    try {
        await prisma.warns.delete({
            where: {warnID: warnID}
        });

        res.sendStatus(200);
    } catch {
        res.status(404).send({
            "ERROR": "The warn could not be deleted because it does not exist."
        });
    }

    return;

});

app.get('/config', async (req, res) => {
    let { guildID } = req.query;
    if( !guildID ) {
        res.status(400).send({
            "ERROR": "Missing guildID in URL parameters."
        });

        return;
    }

    guildID = parseInt(guildID)
    if(isNaN(guildID)) {
        res.status(400).send({
            "ERROR": "guildID must be an INTEGER."
        });

        return;
    }

    const configs = await prisma.configs.findMany({
        where: {guildID: guildID}
    });
    if(configs.length === 0) {
        res.status(200).send({});
        return;
    }

    res.status(200).send(
        configs.map(configs => configToJSON(configs))
    );

    return;


});

app.post('/config', async (req, res) => {
    let { guildID, calc = true, github = true, file = true, codeblock = true} = req.query;

    if ( calc === "false" ) {
        calc = false
    }
    if (github === "false") {
        github = false
    }
    if (file === "false") {
        file = false
    }
    if (codeblock === "false") {
        codeblock = false
    }   

    if( !guildID ) {
        res.status(400).send({
            "ERROR": "Missing guildID in params"
        }); 
        return
    }

    if ([calc, github, file, codeblock].every(val => val === true)) {
        res.status(400).send({
            "ERROR": "Missing a param (needs at least calc, github, file, codeblock)"
        }); 
        return
    }

    guildID = parseInt(guildID);
    if(isNaN(guildID)) {
        res.status(400).send({
            "ERROR": "guildID must be an INTEGER."
        });

        return;
    }

    await prisma.configs.create({
        data: { 
            guildID: guildID,
            calc: calc,
            github: github,
            file: file,
            codeblock: codeblock
        }
    });

    res.sendStatus(200);

    return;

});

app.delete('/config', async (req, res) => {
    let { guildID } = req.query;  

    if( !guildID ) {
        res.status(400).send({
            "ERROR": "Missing guildID in params"
        }); 
        return
    }

    guildID = parseInt(guildID)
    if(isNaN(guildID)) {
        res.status(400).send({
            "ERROR": "guildID must be an INTEGER."
        });

        return;
    }
    
    try {
        await prisma.configs.delete({
            where: {
                guildID: guildID,
            }
        });

        res.sendStatus(200);
    } catch (err) {
        console.log(err)
        res.status(404).send({
            "ERROR": "The config could not be deleted because it does not exist."
        });
    }

    return;

});

app.patch('/config', async (req, res) => {
    let { guildID, calc = null, github = null, file = null, codeblock = null} = req.query;

    if ( calc === "false" ) {
        calc = false
    }
    if (github === "false") {
        github = false
    }
    if (file === "false") {
        file = false
    }
    if (codeblock === "false") {
        codeblock = false
    }   

    if ( calc === "true" ) {
        calc = true
    }
    if (github === "true") {
        github = true
    }
    if (file === "true") {
        file = true
    }
    if (codeblock === "true") {
        codeblock = true
    }   

    if( !guildID ) {
        res.status(400).send({
            "ERROR": "Missing guildID in params"
        }); 
        return
    }

    guildID = parseInt(guildID);

    if(isNaN(guildID)) {
        res.status(400).send({
            "ERROR": "guildID must be an INTEGER."
        });

        return;
    }

    try {
        if ( calc != null ) {
            await prisma.configs.update({
                where: {
                    guildID: guildID
                },
                data: {
                    calc: calc,
                }    
            });
        }
        else if ( github != null ) {
            await prisma.configs.update({
                where: {
                    guildID: guildID
                },
                data: {
                    github: github
                }    
            });
        }
        else if ( file != null ) {
            await prisma.configs.update({
                where: {
                    guildID: guildID
                },
                data: {
                    file: file
                }    
            });
        }
        else if ( codeblock != null ) {
            await prisma.configs.update({
                where: {
                    guildID: guildID
                },
                data: {
                    codeblock: codeblock
                }    
            });
        }
        
    } catch (err) {
        console.log(err)
        res.status(404).send({
            "ERROR": "Provided guildID was not found."
        });

        return;
    }

    res.sendStatus(200);
});



app.listen(port, () => {
    console.log(`Listening at https://localhost:${port}`);
});