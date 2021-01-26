import Swal from 'sweetalert2';

const displayErrorInSwal = (err, callingComponentHistory) => {

    let swalMessage = null;
    let swalTitle = "";
    if(err.message !== undefined && err.message !== null) {
        swalMessage = err.message;
        if(err.message.includes("|")) {
            swalMessage = err.message.substring(err.message.indexOf("|")+1);
            swalTitle = err.message.substring(0, err.message.indexOf("|"));
        }
    }
    else 
        swalMessage = err;

    Swal.fire(
        {
           title: swalTitle,
           text: swalMessage,
           timer: 20000,
           icon: "error",
           showCancelButton: true,
           cancelButtonColor: '#1dd168',
           cancelButtonText: 'For more info'
        }).then(res => {
            if(res.dismiss === 'cancel')
            alert(JSON.stringify(err))
               if(swalTitle.includes('403'))
                    if(callingComponentHistory !== undefined && callingComponentHistory !== null)
                        callingComponentHistory.push("/login");
           });
};

export default displayErrorInSwal;