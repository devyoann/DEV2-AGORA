$(document).ready(function(){
    $('form#formsignup').submit(function(event) {
        let data = $(this).serialize()

        $.ajax({
            method  : 'POST',
            url     : 'app/signup',
            data    : data,
            success : function(message) {
                console.log(message);
                if(message.type == 'success')
                    window.location.href = message.mess
            },
            error   : function(err) {
                console.log(err)
            }
        })

        event.preventDefault()
    })
})