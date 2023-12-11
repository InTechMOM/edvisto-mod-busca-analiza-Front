document.addEventListener('DOMContentLoaded', function() {
  var urlParams = new URLSearchParams(window.location.search);
  var folderName = urlParams.get('folderName');

  if (folderName) {
    serviceGetFolder(folderName, null, function(responseData){
      console.log('Respuesta de la API:', responseData.folders);
      if(responseData.folders.length == 0){
          alert('no se encontro el folder')
      }
      const folder = responseData.folders[0];
      document.getElementById("NombreProyecto").value= folder.folderName
      document.getElementById("ObjectPart").value= folder.objective
    });
    return
  }
  alert("fallo al cargar el folder")
});

document.getElementById('EditButton').addEventListener('click', function() {
    const campos = document.querySelectorAll('.InputNewFolder1');
    const uploadInput = document.getElementById('UploadImageInput');
    const editButton = document.getElementById('EditButton');
    const backButton = document.getElementById('BackButton');

    if(editButton.dataset.estado ==='editando'){
        for (var i = 0; i < campos.length; i++) {
        campos[i].readOnly = true;
        campos[i].style.borderColor = 'var(--tech30)';
    }
        uploadInput.setAttribute('disabled', 'true');
    
        editButton.style.backgroundImage = 'url("../images/edit.svg")'; 
        editButton.value = 'Editar';
        backButton.style.display ='block';
        backButton.style.textUnderlineOffset='';

        editButton.dataset.estado = 'no editando'; 

        

    } else{
        for (var i = 0; i < campos.length; i++) {
            campos[i].readOnly = false;
            campos[i].style.borderColor = 'var(--tech)';
        }
        uploadInput.removeAttribute('disabled');
        
        editButton.style.backgroundImage = 'url("../images/check.svg")'; 
        editButton.value = 'Guardar';
        backButton.style.display ='none';
    
        editButton.dataset.estado = 'editando';
 
    }  
    
   
    
    });

    const buttons_tab = document.querySelectorAll(".tabButton");
    const tabBox1 = document.querySelector(".tab_api1");
    const tabBox2 = document.querySelector(".tab_api2");
    const mensajeExistente = document.querySelector("#Save-videos");
    const mensajeOriginal = mensajeExistente.dataset.originalMessage;

    // if (tabBox1) {
    //   tabBox1.innerHTML = "¡Ouch! Aun no tienes Videos Guardados";
    // }

    // if (tabBox2) {
    //   tabBox2.innerHTML = "¡Ouch! Aun no tienes Artículos Guardados";
    // }

   
      
        buttons_tab.forEach((b) => {
          b.addEventListener("click", () => {
            buttons_tab.forEach((btn) => {
              btn.classList.remove("active");
              const activeImg = btn.querySelector(".active-image");
              const defaultImg = btn.querySelector(".default-img");
              activeImg.style.display = "none";
              defaultImg.style.display = "block";
              mensajeExistente.textContent = "¡Ouch! Aún no tienes Artículos Guardados";
              
            });
            b.classList.add("active");
            const activeImg = b.querySelector(".active-image");
            const defaultImg = b.querySelector(".default-img");
            activeImg.style.display = "block";
            defaultImg.style.display = "none";
          
        
          });
          const targets = document.querySelectorAll("[data-target]");
          const content = document.querySelectorAll("[data-content]");
          targets.forEach((target) => {
            target.addEventListener("click", function () {
              content.forEach((c) => {
                c.classList.remove("activo");
                
              });
              const t = document.querySelector(target.dataset.target);
              t.classList.add("activo");

              
            
            });
        });
    });

   
    const fileInput = document.getElementById('UploadImageInput');
    const customButton = document.getElementById('custom-button');
    const previewImage = document.getElementById('Upload-Image1');
    const UploadImageInput = document.getElementById('UploadImage');

        customButton.addEventListener('click', () => {
          fileInput.click();
        });

        document.addEventListener('DOMContentLoaded', function () {
            
        
        fileInput.addEventListener('change', function () {
                const file = fileInput.files[0];
        
                if (file) {
                    const reader = new FileReader();
        
                    reader.addEventListener('load', function () {
                        previewImage.src = reader.result;
                        previewImage.style.display = 'block';
                        
                    });
        
                    reader.readAsDataURL(file);
                }
            });
        }); 

