(function ($) {
    // NAVBAR
    $('.navbar-nav .nav-link').click(function(){
        $(".navbar-collapse").collapse('hide');
    });

})(window.jQuery);

document.querySelector('#submit-form').onsubmit = function(e) {
    e.preventDefault(); //không cho reset website sau khi submit

    let msgObject = document.querySelector('.msg'); //message
        msgObject.innerText = '';

    //truy cập thành phần
    let nameObject = document.querySelector('input[name="name"]');
    let addressObject = document.querySelector('input[name="address"]');
    let guestsObject = document.querySelector('input[name="guests"]');
    let messageObject = document.querySelector('textarea[name="message"]'); 

    //lấy giá trị
    let name = nameObject.value;
    let address = addressObject.value;
    let guests = guestsObject.value;
    let message = messageObject.value;


    //about validate 
        //reset validate
        let requiredObject = document.querySelectorAll('.required');
        if (requiredObject.length>0){
            requiredObject.forEach(function(item){
                item.innerText = ' ';
            })
        }
        //validate
        let error = {}
        if (name.trim()==''){
            error['name'] = 'Không được để trống';
            nameObject.parentElement.querySelector('.required').innerText = error['name'];     
        }
        if (address.trim()==''){
            error['address'] = 'Không được để trống';
            addressObject.parentElement.querySelector('.required').innerText = error['address'];     
        }
        if (guests.trim()==''){
            error['guests'] = 'Không được để trống';
            guestsObject.parentElement.querySelector('.required').innerText = error['guests'];     
        }
        if (Object.keys(error).length==0){
            //không có lỗi --> lấy và gửi dữ liệu
            // cái entry bên dưới còn tùy thuộc vào ip của bạn
            let data = {
                'entry.189044527':name,
                'entry.1921041377':address,
                'entry.435364288':guests,
                'entry.1922189595':message
            }
            //chuyển đổi string
            let queryString = new URLSearchParams(data);
                queryString = queryString.toString();

            //thích thì thêm :)))
            msgObject.innerHTML = '<div class="alert alert- text-center">Đang xử lý dữ liệu...</div>';

            //post dữ liệu    
            let xhr = new XMLHttpRequest();
            xhr.open("POST", 'https://docs.google.com/forms/u/0/d/e/1FAIpQLScPbf6ihhQHxoBIr52X8LpmRAAkz6PldaPtj2GFZHmWkAWr-Q/formResponse', true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                msgObject.innerHTML = '<div class="alert alert-success text-center">Gửi dữ liệu thành công</div>';

            //reset dữ liệu sau khi submit
            nameObject.value = ' ';
            addressObject.value = ' ';
            guestsObject.value = ' ';
            messageObject.value = ' ';
            xhr.send(queryString);
        }else{
            msgObject.innerHTML = '<div class="alert alert-danger text-center">vui lòng kiểm tra dữ liệu</div>';
        }
}