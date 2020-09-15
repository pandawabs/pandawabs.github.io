var __pdata;
var __GET = {};

if(document.location.toString().indexOf('?') !== -1) {
    var query = document.location
                .toString()
                // get the query string
                .replace(/^.*?\?/, '')
                // and remove any existing hash string (thanks, @vrijdenker)
                .replace(/#.*$/, '')
                .split('&');

    for(var i=0, l=query.length; i<l; i++) {
        var aux = decodeURIComponent(query[i]).split('=');
        __GET[aux[0]] = aux[1];
    }
}

$(document).ready( function(){
    
    var language = (__GET['lang'] == null ? 'en':__GET['lang']); //Defaut: English
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

    var loadPersonalData = function(language) {
        return axios.get('assets/file/cv_2020_'+language+'.min.json', {responseType: 'json'});
        // return axios.get('assets/file/cv_2020_'+language+'.json', {responseType: 'json'});
    };
    
    Promise.all([loadPersonalData(language),loadMainPage()]).then(function (responses) {
        
        loadingBar.set(100,true);
        __pdata = responses[0].data;
        $('.main-container').html(responses[1].data);

        let anim = {
            'animation-duration':'0.6s',
            'animation-delay':'1.75s'
        };
        
        setTimeout(() => {
            $('.loader-container').hide();    
        }, 2500);

        $('.loader-container').addClass('ld ld-fade-out').css(anim);
    })
    .catch(function (error) {
        console.log(error);
    });

    moment.locale(language);
});