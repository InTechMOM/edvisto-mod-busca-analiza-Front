    const seccionbiblioteca = document.getElementById('seccionbiblioteca');
    const savebutton = document.getElementById('save');
    const abrirPopUp = document.getElementById('CrearNewFolder');
    const cerrarPopUp = document.getElementById('CancelButton');
    const PopUp = document.getElementById('Form1');
    const formulario = document.querySelector('.Formulario');
    const abrirConfirmacionCarpeta = document.getElementById('AcceptButton');
    const cerrarConfirmacionCarpeta = document.getElementById('CloseButton');
    const ConfirmacionCrearCarpeta = document.getElementById('ConfirmacionCrearCarpeta');
    const fileInput = document.getElementById('UploadImageInput');
    const customButton = document.getElementById('custom-button');
    const previewImage = document.getElementById('Upload-Image');
    const UploadImageInput = document.getElementById('UploadImage');
    
    document.addEventListener('DOMContentLoaded', function() {
       
        serviceGetFolder(null, "user@gmail.com", function(responseData){
        console.log('Respuesta de la API:', responseData.folders);
        if(responseData.folders.length == 0){
            alert('no se encontro el folder')
            return
        }
       
        });
        
      });
    
    abrirPopUp.addEventListener("click",()=>{
        console.log('Abriendo formulario');
        PopUp.showModal();
        borrarImagenPredeterminada();
        
    }) 
    cerrarPopUp.addEventListener("click",()=>{
        console.log('Cerrando formulario');
        PopUp.close();        
        borrarImagenPredeterminada(); 
                                
    })

    function cleanForm(){
       document.getElementById('NombreProyecto').value = '';
       document.getElementById('Objetivo').value = '';
       document.getElementById('UploadImageInput').value = '';
    }
    
    function borrarImagenPredeterminada() {
        previewImage.src = "./images/upload-image.svg";
        
    }

    function submitFolder() {
        const userEmail = 'user@gmail.com';    
        const NombreProyecto = document.getElementById('NombreProyecto').value;
        const Objetivo = document.getElementById('Objetivo').value;
        const fileInput = document.getElementById('UploadImageInput').value;

        const payload = {userEmail,NombreProyecto,Objetivo,fileInput}
    
        if(validarFormulario(payload)){
            console.log('Formulario válido. Enviar formulario...');
            createFolder(payload)                      
        } else{
            console.log('Formulario no válido. Verifica los campos.');
        }
    }


    customButton.addEventListener('click', () => {
        fileInput.click();
    });

    function loadFile() {
        const file = fileInput.files[0];

        if (file) {
            const reader = new FileReader();

            reader.addEventListener('load', function () {
                previewImage.src = reader.result;
                previewImage.style.display = 'block';
                
            });

            reader.readAsDataURL(file);
        }
    };
    
    
    function validarFormulario(payload){
        

        if(payload.NombreProyecto.trim()===''){
            alert('El campo Nombre del Proyecto no puede estar vacío.');
            return false;
        }

        if(payload.Objetivo.trim()===''){
            alert('El campo Objetivo no puede estar vacío.');
            return false;
        }

        if(payload.fileInput.trim()===''){
            alert('Debes seleccionar una imágen.');
            return false;
        }


        return true
    }          

        cerrarConfirmacionCarpeta.addEventListener("click",()=>{
            ConfirmacionCrearCarpeta.close();
            PopUp.close();
            ConfirmacionCrearCarpeta.style.display = 'none';
        }) 
            

    
    
    console.log('Le diste click al botón biblioteca')
        
      
    
    
   
   function createFolder(payload){
    serviceCreateFolder(payload, function(responseData) {
         
         if (responseData?.error) {
            console.error('Error al enviar la solicitud:', responseData.error);
            alert(`Error al enviar la solicitud: ${responseData.error}`);
            return
        }
        console.log(responseData)
        const url = '/nuevacarpeta.html?folderName='+ encodeURIComponent(responseData.data.folderName)
        ConfirmacionCrearCarpeta.style.display = 'block';
        document.getElementById("gotoNewFolder").href = url
        ConfirmacionCrearCarpeta.showModal();
        createFolderHtml(responseData.data);
    })
   }

    function createFolderHtml(data) {
        const folder = document.createElement("div");
            folder.classList.add("carpeta");
            folder.id = ("carpetaNueva");
            const folderTitle = document.createElement("p");
            folderTitle.id = ("FolderName");
            folderTitle.innerText = data.folderName;
            folder.appendChild(folderTitle);

            const imageElement = document.createElement("img");
            imageElement.id = ("image1");
            imageElement.src = data['imageUrl'];
            folder.appendChild(imageElement);

            const hoverDiv = document.createElement("div");
            hoverDiv.classList.add("HoverCarpeta");
            const community = document.createElement("img");
            community.src = "../images/community-folder.svg";
            community.alt = "Icono comunidad";
            community.width = "22px";
            community.height = "13.62px";
            community.id = ("Community");
            const p = document.createElement("p");
            const textoComunidad = document.createTextNode("Comunidad");
            p.appendChild(textoComunidad);
            p.appendChild(community);
            hoverDiv.appendChild(p);

            const btn = document.createElement("button");
            btn.classList.add("button-go");
            btn.id = ("botoncarpeta");
            btn.innerHTML = "¡Vamos!";
            btn.ariaLabel = "Botón de ir a la sección de Búsqueda";
            hoverDiv.appendChild(p);
            hoverDiv.appendChild(btn);

            folder.appendChild(hoverDiv);

            const folderArea = document.getElementById('carpetasBiblioteca');
            folderArea.appendChild(folder);

            
    } 

  

    
    
        
    

  
        
        
    
                
                    
                
                    
                

   
                       
            
            


   

       

     