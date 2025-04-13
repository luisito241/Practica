document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const editProfileBtn = document.getElementById('edit-profile');
    const cancelEditBtn = document.getElementById('cancel-edit');
    const saveChangesBtn = document.getElementById('save-changes');
    const editForm = document.getElementById('edit-form');
    const perfilInfo = document.querySelector('.perfil-info');
    const perfilEditar = document.querySelector('.perfil-editar');
    const fileInput = document.getElementById('file-input');
    const profilePicture = document.getElementById('profile-picture');
    
    // Variables para almacenar datos originales
    let originalData = {
        firstName: document.getElementById('user-first-name').textContent,
        lastName: document.getElementById('user-last-name').textContent,
        email: document.getElementById('user-email').textContent,
        phone: document.getElementById('user-phone').textContent,
        address: document.getElementById('user-address').textContent,
        dob: document.getElementById('user-dob').textContent
    };
    
    // Función para mostrar el formulario de edición
    function showEditForm() {
        perfilEditar.classList.add('active');
        
        // Inicializar valores del formulario
        document.getElementById('edit-first-name').value = document.getElementById('user-first-name').textContent;
        document.getElementById('edit-last-name').value = document.getElementById('user-last-name').textContent;
        document.getElementById('edit-email').value = document.getElementById('user-email').textContent;
        document.getElementById('edit-phone').value = document.getElementById('user-phone').textContent;
        document.getElementById('edit-address').value = document.getElementById('user-address').textContent;
        
        // Convertir fecha de formato DD/MM/YYYY a YYYY-MM-DD para el input date
        const dobParts = document.getElementById('user-dob').textContent.split('/');
        if (dobParts.length === 3) {
            const dobFormatted = `${dobParts[2]}-${dobParts[1]}-${dobParts[0]}`;
            document.getElementById('edit-dob').value = dobFormatted;
        }
    }
    
    // Función para ocultar el formulario de edición
    function hideEditForm() {
        perfilEditar.classList.remove('active');
    }
    
    // Función para guardar los cambios
    function saveChanges(e) {
        e.preventDefault();
        
        // Mostrar animación de guardado
        saveChangesBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Guardando...';
        saveChangesBtn.disabled = true;
        
        // Simulamos una demora en el guardado (como si conectara con un servidor)
        setTimeout(() => {
            // Actualizar datos en la interfaz
            document.getElementById('user-first-name').textContent = document.getElementById('edit-first-name').value;
            document.getElementById('user-last-name').textContent = document.getElementById('edit-last-name').value;
            document.getElementById('user-email').textContent = document.getElementById('edit-email').value;
            document.getElementById('user-phone').textContent = document.getElementById('edit-phone').value;
            document.getElementById('user-address').textContent = document.getElementById('edit-address').value;
            
            // Convertir fecha de formato YYYY-MM-DD a DD/MM/YYYY
            const dobValue = document.getElementById('edit-dob').value;
            if (dobValue) {
                const dobDate = new Date(dobValue);
                const formattedDob = `${String(dobDate.getDate()).padStart(2, '0')}/${String(dobDate.getMonth() + 1).padStart(2, '0')}/${dobDate.getFullYear()}`;
                document.getElementById('user-dob').textContent = formattedDob;
            }
            
            // Actualizar datos originales
            originalData = {
                firstName: document.getElementById('user-first-name').textContent,
                lastName: document.getElementById('user-last-name').textContent,
                email: document.getElementById('user-email').textContent,
                phone: document.getElementById('user-phone').textContent,
                address: document.getElementById('user-address').textContent,
                dob: document.getElementById('user-dob').textContent
            };
            
            // Restaurar botón y ocultar formulario
            saveChangesBtn.innerHTML = '<i class="fas fa-save"></i> Guardar';
            saveChangesBtn.disabled = false;
            hideEditForm();
            
            // Mostrar notificación de éxito
            showNotification('Perfil actualizado con éxito', 'success');
        }, 800);
    }
    
    // Función para manejar el cambio de imagen de perfil
    function handleProfilePictureChange() {
        const file = fileInput.files[0];
        if (file) {
            // Verificar si es una imagen
            if (!file.type.startsWith('image/')) {
                showNotification('Por favor, selecciona un archivo de imagen válido', 'error');
                return;
            }
            
            const reader = new FileReader();
            reader.onload = function(e) {
                // Actualizar la imagen con una animación suave
                profilePicture.style.opacity = 0;
                setTimeout(() => {
                    profilePicture.src = e.target.result;
                    profilePicture.style.opacity = 1;
                }, 300);
                
                showNotification('Foto de perfil actualizada', 'success');
            };
            reader.readAsDataURL(file);
        }
    }
    
    // Función para mostrar notificaciones
    function showNotification(message, type) {
        // Crear elemento de notificación
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        const icon = type === 'success' 
            ? '<i class="fas fa-check-circle"></i>' 
            : '<i class="fas fa-exclamation-circle"></i>';
            
        notification.innerHTML = `
            ${icon}
            <span>${message}</span>
        `;
        
        // Añadir estilos
        Object.assign(notification.style, {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            backgroundColor: type === 'success' ? '#2dce89' : '#f5365c',
            color: 'white',
            padding: '12px 20px',
            borderRadius: '8px',
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
            display: 'flex',
            alignItems: 'center',
            fontWeight: '500',
            zIndex: '1000',
            transition: 'all 0.3s ease',
            transform: 'translateY(100px)',
            opacity: '0'
        });
        
        notification.querySelector('i').style.marginRight = '10px';
        
        // Añadir al DOM
        document.body.appendChild(notification);
        
        // Mostrar con animación
        setTimeout(() => {
            notification.style.transform = 'translateY(0)';
            notification.style.opacity = '1';
        }, 10);
        
        // Eliminar después de 3 segundos
        setTimeout(() => {
            notification.style.transform = 'translateY(100px)';
            notification.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // Agregar efecto de ondas (ripple) a los botones
    function addRippleEffect(element) {
        element.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
            ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
            
            ripple.classList.add('active');
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }
    
    // Añadir estilos para el efecto de ondas
    const style = document.createElement('style');
    style.textContent = `
        .btn-edit, .btn-save, .btn-cancel {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            background-color: rgba(255, 255, 255, 0.4);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        .notification {
            animation: slideIn 0.3s ease forwards;
        }
        
        @keyframes slideIn {
            from {
                transform: translateY(100px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Añadir listeners de eventos
    editProfileBtn.addEventListener('click', showEditForm);
    cancelEditBtn.addEventListener('click', hideEditForm);
    editForm.addEventListener('submit', saveChanges);
    fileInput.addEventListener('change', handleProfilePictureChange);
    
    // Añadir efectos de ondas a los botones
    addRippleEffect(editProfileBtn);
    addRippleEffect(saveChangesBtn);
    addRippleEffect(cancelEditBtn);
    
    // Animar la carga inicial de la página
    const infoSections = document.querySelectorAll('.info-section');
    infoSections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        setTimeout(() => {
            section.style.transition = 'all 0.5s ease';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, 100 * index);
    });
});