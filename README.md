# ez_distribution
A package created to automate many of the tasks associated with creating &amp; distributing broadcast files for TV. Inside is an After Effects script that will version out all different file types you need based off TV station data that you input. This includes adding slates and black to spots. In addition to this script, there are also 2 HTML files you can open in your browser. 1 is job specific - lists the stations that are on the particular job you are prepping, with a friendlier UI and some automated tasks like one-click e-mail setup for station reps. The other HTML file is a markup language representation of your master station list. If you're not a programmer this may sound like a foreign language, but I promise you I break it down below, so don't give up yet!

### What You Need 

* [Adobe After Effects](https://www.adobe.com/products/aftereffects.html)
* [Adobe Media Encoder](https://www.adobe.com/products/media-encoder.html)
* [Extendscript Toolkit CC](https://helpx.adobe.com/download-install/kb/creative-cloud-apps-download.html) - Find it in for your OS in this list. Should be free if you have the aforementioned programs.

### Optional

* [Python 3](https://www.python.org/download/releases/3.0/) - There is a python script in here that makes your life easier, but it is not necessary. Saves some dragging of files.
* [Sublime Text](https://www.sublimetext.com/) - Any native text editor will work, but Sublime makes for a more comfortable experience.

## Getting Started

Programmers bear with me, I am writing this README also for non-programmers in the video industry.

The crux of this package is rooted in the ```stationSpecs.jsx``` file, inside the ```stationSpecs``` variable. It's in here that you will input your station data. You will need to open this in a native text editor or one you've downloaded like Sublime, recommended above. For example, here is how that data should be entered:

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

Save your changes. In addition to creating a centralized location for all your station specs/delivery data, this JSON object will also power the automation in this package. Here we have an example of 2 TV stations (Spectrum and WGRZ) and 1 distribution company (Extreme Reach). The metadata for each is imperative to how the script creates files and how the HTML files display the data. I'll break down each category as follows: 

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

### Custom Slate
Now that you have your station data input into the ```stationSpecs.jsx``` file, there are a couple things you should take care of next. First, the slate that is being referenced in the script goes in the ```elements``` folder. I included a generic one called slate.mov, but if you want to use a custom one just replace that file. However, make sure the following is true:

* slate format is MOV. If you want to change the name or file extension of the slate file, you will need to do update that info in ```fileCreationScript.jsx```. More info on that below.
* total length of slate is 7 seconds.
* slate counts down from 7 to 0, the final 2 seconds being just black.

### Create Watch Folders
Unfortunately, as I understand it, the current versions of After Effects do not allow you to export the full breadth of options something like Media Encoder does, this includes popular station specs like MPEG2. This necessitated my need to involve AME watch folders in this process. **FOR EVERY STATION YOU ADD TO ```stationSpecs.jsx```, YOU MUST CREATE A CORRESPONDING WATCH FOLDER.**

Watch folders wait for a video file to be rendered into them, at which point they will transcode the file into any number of different specs you designate. For more on watch folders and how to create them, see [here](https://larryjordan.com/articles/adobe-media-encoder-watch-folders/). Here you can see an example of my watch folder setup for the 3 example stations:

![Watch Folders](https://i.imgur.com/ATMwGJg.png)

Please note, the final folder destination for these watch folders is ```<station_name>/Output/```. ```Output/``` is generated automatically by Adobe Media Encoder, so all you need to do when you set up your watch folders is:
         
* All your station watch folders sit together as subfolders of one file path.
* Make sure the ```<station_name>``` folder name matches the ```stationSpecs``` station ID **EXACTLY.** Capital/lowercase letters and all. The routing to the watch folders relies on ```stationSpecs.```

As stated before, these watch folders must all live as subfolders in one master folder. As you can see in my screenshot, mine is ```.../_STATION_FILES_/```. Your path will depend on your computer. Once your watch folders are set and you have your path to them, it's time to open up ```fileCreationScript.jsx``` in your text editor. At the top of the script you will see the following:

```
//****************USER INPUT INFO HERE. CHANGE NOTHING ABOVE THIS LINE.*******************
var pathToWatchFolders = '/path/to/your/_STATION_FILES_/';
var masterFileExtension = '.mov';
var slateFileName = 'slate.mov';
var slateFont = 'Gotham Bold';
var slateFontSize = 55;
var slateFontColor = [1,1,1];
var aeRenderPreset = 'ProRes';
//****************USER INPUT INFO HERE. CHANGE NOTHING BELOW THIS LINE.*******************

```
Paste or type your watch folder path in between the quotes in ```pathToWatchFolders```. Save.

### Main Script Customizations

Let's move on to the other 6 variables in ```mainScript.jsx```. Beyond adding the file path to the watch folders, you can also change 6 other conditions of the script. These are:

* **masterFileExtension** - Eventually you will be placing your master renders in the ```masters/``` folder. In order for the script to import these files to AE without error (that can come from trying to handle hidden files), you need to specify file extensions to import. My post house uses ProRes and DNXHD MOVs. So I put ```'.mov'``` as the default. If you use files of a different container as your masters, just change the extension here.
* **slateFileName** - As referenced earlier in this document, here is where you can alter the slate file name. If you replace the slate in ```elements/``` and it's no longer named the default ```slate.mov```, you will need to change this here, lest the script break!
* **slateFont** - Enter the name of the font as it appears in the character window in AE.
* **slateFontSize** - Enter the size of the font as it appears in the character window in AE.
* **slateFontColor** - Enter the color you want your slate text to be. Use any RGB value (0-1 range) you want in the array [red, green, blue]. The default is [1,1,1] or white.
* **aeRenderPreset** - After effects handles importing the masters, adding necessary slates, then rendering out to AME where the watch folders take over. This is where you tell After Effects what setting to use when rendering. When you are in the Render Queue in AE, this is the exact name in the ```Output Module``` field. I went ahead and created a preset called ```ProRes```. You can create you own preset like me, or use a default AE setting like ```Lossless``` etc.

Congratulations! Your setup is done. Now onto the fun stuff - the automation!

## Running the File Creation Script

It's meat & potatoes time! You suffered the headache of setting up the above, now it's time to reap the rewards! Your downloaded **ez_distribution** file structure looks like this:

![ez_distribution files 1](https://i.imgur.com/xJOXpbb.png)

Save this as your base folder. You will use this to update station info or anything that we covered above - anything that will apply to all future projects. 
