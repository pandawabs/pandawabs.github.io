var __pdata;

$(document).ready( function(){
    
    var loadingBar = new ldBar('.loader-bar', {
            'data-type':'stroke',
            'data-fill-dir':'ltr'
        });
    
    var loadMainPage = function() {
        return axios.request({
            url: 'main.html',
            method: 'get',
            timeout: 60000,
            onDownloadProgress: function(e) {
                if(e.lengthComputable){
                    loadingBar.set((e.loaded/e.total) * 100, false);
                }
            }
        });
    };

    var loadPersonalData = function() {
        return axios.get('assets/file/cv_2020.min.json', {responseType: 'json'});
        // return axios.get('assets/file/cv_2020.json', {responseType: 'json'});
    };
    
    Promise.all([loadPersonalData(),loadMainPage()]).then(function (responses) {
        
        loadingBar.set(100,true);
        __pdata = responses[0].data;
        $('.main-container').html(responses[1].data);

        let anim = {
            'animation-duration':'0.6s',
            'animation-delay':'1.75s'
        };
        
        let hide = setTimeout(() => {
            $('.loader-container').hide();    
        }, 2500);

        $('.loader-container').addClass('ld ld-fade-out').css(anim);
    })
    .catch(function (error) {
        console.log(error);
    });
});