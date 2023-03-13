export const checkTheUrl=(title,url)=>{
    switch(title){
        case "Instagram":
            if(url.match(/^(?:(?:http|https):\/\/)?(?:www.)?(?:instagram.com|instagr.am|instagr.com)\/(\w+)/igm)==null)
                return true;
            else
                return false;
        case "Linkedin":
            if(url.match(/^(http(s)?:\/\/)?([\w]+\.)?linkedin\.com\/(pub|in|profile|posts)/gm)==null)
                return true;
            else
                return false;
        case "Discord":
            if(url.match(/(https:\/\/)?(www\.)?(((discord(app)?)?\.com\/invite|users)|((discord(app)?)?\.gg))\/(?<invite>.+)/gm)==null)
                return true;
            else
                return false;
        case "Youtube":
            if(url.match(/^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch|\?v=([a-zA-Z0-9_]+)|youtu\.be\/([a-zA-Z\d_]+))(?:&.*)?|youtube.com\/shorts\/|youtube.com\/@/gm)==null)
                return true;
            else
                return false;
        case "Facebook":
            if(url.match(/(?:http:\/\/)?(?:www.)?facebook.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w-]*\/)?(?:profile.php\?id=(\d.*))?([\w-]*)$|(https:\/\/fb.watch\/|https:\/\/www.facebook.com\/)/gmi)==null)
                return true;
            else
                return false;
        case "Twitter":
            if(url.match(/http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/gi)==null)
                return true;
            else
                return false;
        case "Spotify":
            if(url.match(/(https?:\/\/open.spotify.com\/(track|user|artist|album|playlist)\/[a-zA-Z0-9]+(\/playlist\/[a-zA-Z0-9]+|)|spotify:(track|user|artist|album):[a-zA-Z0-9]+(:playlist:[a-zA-Z0-9]+|))/)==null)
                return true;
            else
                return false;
        case "Pintrest":
            if(url.match(/^(https:\/\/pin.it)\/[0-9A-Za-z]{7}/gi)==null)
                return true;
            else
                return false;
        case "Skype":
            if(url.match(/^(https:\/\/join.skype.com)\//gi)==null)
                return true;
            else
                return false;
        case "Google Meet":
            if(url.match(/^(https:\/\/meet.google.com\/)([A-Za-z]{3}-[A-Za-z]{4}-[A-Za-z]{3})/gi)==null)
                return true;
            else
                return false;
        case "Zoom":
            if(url.match(/https:\/\/[\w-]*\.?zoom.us\/(j|my)\/[\d\w?=-]+/g)==null)
                return true;
            else
                return false;
        case "Telegram":
            if(url.match(/(https?:\/\/)?(www[.])?(telegram|t)\.me\/([a-zA-Z0-9_-]*)\/?$/g)==null)
                return true;
            else
                return false;
        case "Snapchat":
            // eslint-disable-next-line
            if(url.match(/^https?:\/\/(?:www\.)?snapchat\.com\/add\/([a-z][0-9a-z\-_\.]{1,13}[0-9a-z])/gm)==null)
                return true;
            else
                return false;
        case "Google Drive":
            if(url.match(/(https:\/\/drive.google.com\/)/gm)==null)
                return true;
            else
                return false;
        case "Google Form":
            if(url.match(/^(https:\/\/forms.gle\/)[0-9A-Za-z]{17}/gm)==null)
                return true;
            else
                return false;
        case "Whatsapp":
            if(url.match(/^https:\/\/(chat|call|api).whatsapp.com\//)==null)
                return true;
            else
                return false;
        default:
            return false;
    }
}