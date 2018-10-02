# ez_distribution
A package created to automate many of the tasks associated with creating &amp; distributing broadcast files for TV. Inside is an After Effects script that will version out all different file types you need based off TV station data that you input. This includes adding slates and black to spots. In addition to this script, there are also 2 HTML files you can open in your browser. 1 is job specific - lists the stations that are on the particular job you are prepping, with a friendlier UI and some automated tasks like one-click e-mail setup for station reps. The other HTML file is a markup language representation of your master station list. If you're not a programmer this may sound like a foreign language, but I promise you I break it down below, so don't give up yet!

### What You Need 

* [Adobe After Effects](https://www.adobe.com/products/aftereffects.html)
* [Adobe Media Encoder](https://www.adobe.com/products/media-encoder.html)
* [Extendscript Toolkit CC](https://helpx.adobe.com/download-install/kb/creative-cloud-apps-download.html) - Find it in for your OS in this list. Should be free if you have the aforementioned programs.

### Optional

* [Python 3](https://www.python.org/download/releases/3.0/) - There is a python script in here that makes your life easier, but it is not necessary. Saves some dragging of files.

## Getting Started

Programmers bear with me, I am writing this README also for non-programmers in the video industry.

The crux of this package is rooted in the ```stationSpecs.jsx``` file, inside the ```stationSpecs``` variable. It's in here that you will input your station data. For example, here is how that data should be entered:

```
var stationSpecs = {
         'SPECTRUM' : {
                'slate' : 0,
                'pre-slate' : 0,
                'post-video' : 0,
                'fps': 29.97,
                'resolution': [1920,1080],
                'format' : 'MPEG2',
                'fields' : 'progressive',
                'alt' : null,
                'delivery' : '<a href="https://www.onespot.tv/LogIn.aspx?ReturnUrl=%2fUpload.aspx" target="_blank">OneSpot</a>',
                'username' : 'username',
                'password' : 'password',
                'reps' : ['webmaster@example.com','joe@joe.com']
         },
         'ER' : {
                'slate' : 7,
                'pre-slate' : 0,
                'post-video' : 0,
                'fps': 29.97,
                'resolution': [1920,1080],
                'format' : 'ProRes',
                'fields' : 'progressive',
                'alt' : null,
                'delivery' : '<a href="https://extremereach.com/" target="_blank">Extreme Reach</a>',
                'username' : 'username',
                'password':'password',
                'reps' : ['webmaster@example.com','joe@joe.com']
         },
         'WGRZ' : {
                'slate' : 7,
                'pre-slate' : 1,
                'post-video' : 2,
                'fps': 29.97,
                'resolution': [1920,1080],
                'format' : 'MPEG2',
                'fields' : 'progressive',
                'alt' : null,
                'delivery' : '<a href="https://www.dropbox.com" target="_blank">Dropbox</a>',
                'username' : 'username',
                'password':'password',
                'reps' : ['webmaster@example.com','joe@joe.com']
         },
```         

In addition to creating a centralized location for all your station specs/delivery data, this JSON object will also power the automation in this package. Here we have an example of 2 TV stations (Spectrum and WGRZ) and 1 distribution company (Extreme Reach). The metadata for each is imperative to how the script creates files and how the HTML files display the data. I'll break down each category as follows: 

* **'slate'** : Enter an integer here that represents the total length of the slate.
* **'pre-slate**' : Enter an integer here that represents the total length of black needed before the slate.
* **'post-video'** : Enter an integer here that represents the total length of black needed after the video.
* **'fps'** : Enter an integer or float here for the target framerate of the final spot.
* **'resolution'** : Enter the resolution in an array with 2 integer values, [width here, height here],
* **'format'** : Enter the format for the video here as a string (in quotes). This is merely read-only for reference and does not rely on consistency or any exact spelling. 
* **'fields'** : Enter the video fields format here as a string (progressive, upper-first, etc.). This is merely read-only for reference and does not rely on consistency or any exact spelling.
* **'alt'** : Enter alternate or sister station call tags here as a string if you don't think they need their own data object. This is merely read-only for reference and does not rely on consistency or any exact spelling.
* **'delivery'** : As a string, enter in the name of the site/FTP/service you use for delivery or, as I did above, add a link to this field via [anchor tags](https://www.w3schools.com/TAGS/tag_a.asp) to really make it easy on yourself when it comes time to distribute.
* **'username'** : Add the username for your site/FTP/service as a string, for reference only.
* **'password'** : Add the password for your site/FTP/service as a string, for reference only. And then make sure to NOT share this package with anyone who shouldn't know it.
* **'reps'** : Add your station reps to this field as strings in an array. For example, what you see above. This will be referenced on the distribution side when it comes time to send confirmation e-mails.

## Next Steps

Now that you have your station data input into the ```stationSpecs,jsx``` file, there are a couple things you should take care of next. First, the slate that is being referenced in the script goes in the ```elements``` folder. I included a generic one called slate.mov, but if you want to use a custom one just replace that file. However, make sure the following is true:

* slate format is MOV, unless you feel like altering the mainScript code - line 60 as of writing this.
* total length of slate is 7 seconds.
* slate counts down from 7 to 0, the final 2 seconds being just black.
