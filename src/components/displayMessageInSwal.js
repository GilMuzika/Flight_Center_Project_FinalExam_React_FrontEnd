import Swal from 'sweetalert2';

const displayMessageInSwal = (message) => {

    Swal.fire(
        {
           text: message
        });


}

export default displayMessageInSwal;