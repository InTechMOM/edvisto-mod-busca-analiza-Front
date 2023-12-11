

function serviceCreateFolder({userEmail,NombreProyecto,Objetivo,fileInput}, callback) {
    fetch(`http://127.0.0.1:3000/create/folder`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: userEmail,
                folderName: NombreProyecto,
                imageUrl: fileInput,
                objective: Objetivo,
            }),
        })
        .then(response => response.json())
        .then((responseData) => {
           callback(responseData)
         })
        .catch(error => {
            console.error('Error al enviar la solicitud:', error);
        });
}


function serviceGetFolder(folderName, email, callback){
    const params= [];
    if (folderName){
        params.push(`folderName=${folderName}`)
    }
    if(email){
        params.push(`email=${email}`)
    }
    fetch(`http://127.0.0.1:3000/folder/find?${params.join("&")}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then(response => response.json())
    .then((responseData) => {
        callback(responseData)
    })

    .catch(error => {
        console.error('Error al enviar la solicitud:', error);
    });
}