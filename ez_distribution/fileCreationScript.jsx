﻿#include "metadata.jsx"#include "station_specs/stationSpecs.jsx"//****************USER INPUT INFO HERE. CHANGE NOTHING ABOVE THIS LINE.*******************var pathToWatchFolders = '';var masterFileExtension = '.mov';var slateFileName = 'slate.mov';var slateFont = 'Gotham Bold';var slateFontSize = 55;var slateFontColor = [1,1,1];var aeRenderPreset = 'ProRes';//****************USER INPUT INFO HERE. CHANGE NOTHING BELOW THIS LINE.*******************//open AME for watch foldersvar initiateAME = app.project.items.addComp('InitiateAME', 4, 4, 1, 1, 24);app.project.renderQueue.items.add(initiateAME);app.project.renderQueue.queueInAME(false);//helper functionsfunction parseName(fileName){    return fileName.split('.')[0]; }function determineCompLength(stationObj, spotLength){    return stationObj['slate'] + stationObj['pre-slate'] + stationObj['post-video'] + spotLength;}function specCompare(stationObj, ISCI){    return ISCI +              stationObj['pre-slate'].toString() +              stationObj['post-video'].toString() +              stationObj['fps'].toString() +              (stationObj['resolution'][0].toString() + stationObj['resolution'][1].toString()) +              stationObj['format'].toString() +              stationObj['fields'].toString();}//variables for avoiding duplicationvar avoidDuplicates = {};var stationArray = [];//import mastersvar rootFolder = Folder.decode(new File($.fileName).parent);var mastersFolder = new Folder(rootFolder + '/masters');var myImportOptions = new ImportOptions();var importedLayers = new Array();var myFiles = mastersFolder.getFiles('*' + masterFileExtension);for(var i=0;i<myFiles.length;i++){	myImportOptions.file = myFiles[i];	importedLayers.push(app.project.importFile(myImportOptions));}var footageArray = [];for(var g =1;g<=app.project.numItems;g++){    if(app.project.item(g).name == 'InitiateAME'){        }    else{        footageArray.push(app.project.item(g));    }       }//import slatevar slateFile = app.project.importFile(new ImportOptions(new File(rootFolder + '/elements/' + slateFileName)));//create compsfor(var e =0;e<footageArray.length;e++){    var renderPath;    var slateLayer;    var textLayer;    var textDocument;    var detectSlateChange;    var tempComp;    var footageLayer;    var stationCode;    var checkSpec;        var isciName = parseName(footageArray[e].name);        for(f=0; f<spotData[isciName]['stations'].length; f++){        stationCode = spotData[isciName]['stations'][f];                tempComp = app.project.items.addComp(                                            isciName,                                            footageArray[e].width,                                             footageArray[e].height,                                             1,                                             determineCompLength(stationSpecs[stationCode], footageArray[e].duration),                                             stationSpecs[stationCode].fps                                            );        footageLayer = tempComp.layers.add(footageArray[e]);                if(stationSpecs[stationCode]['slate']){                    slateLayer = tempComp.layers.add(slateFile);                        detectSlateChange = 7 - stationSpecs[stationCode].slate;                        if(detectSlateChange){                    slateLayer.inPoint = detectSlateChange;                    slateLayer.startTime = stationSpecs[stationCode]['pre-slate'] - detectSlateChange;            }            else{                    slateLayer.startTime = stationSpecs[stationCode]['pre-slate'];            }                                    textLayer = tempComp.layers.addText(spotData[isciName]['title']);            textLayer.inPoint = stationSpecs[stationCode]['pre-slate'];            textLayer.outPoint = textLayer.inPoint + stationSpecs[stationCode]['slate'] - 2;            textDocument = textLayer.property("Source Text").value;            textDocument.justification = ParagraphJustification.CENTER_JUSTIFY;            textDocument.fontSize = slateFontSize;            textDocument.fillColor = slateFontColor;            textDocument.font = slateFont            textLayer.property("Source Text").setValue(textDocument);            textLayer.property('Position').setValue([footageArray[e].width/2,footageArray[e].height/2.5])        }                footageLayer.startTime = stationSpecs[stationCode]['pre-slate'] +                                             stationSpecs[stationCode]['slate'];        checkSpec = specCompare(stationSpecs[stationCode], isciName);                if(checkSpec in avoidDuplicates){                                      avoidDuplicates[checkSpec] = avoidDuplicates[checkSpec] + '_' + stationCode;        }        else{                        //add to render queue            renderPath = new File(pathToWatchFolders + stationCode + '/' + isciName);                        var theRender = app.project.renderQueue.items.add(tempComp);            theRender.outputModules[1].applyTemplate(aeRenderPreset);            theRender.outputModules[1].file = renderPath;                        avoidDuplicates[checkSpec] = stationCode;        }       }}//create folders in project filefor(var key in avoidDuplicates) {    createOutPutFolder = new File(rootFolder + '/station_files/' + avoidDuplicates[key]);    new Folder(createOutPutFolder).create();}//renderapp.project.renderQueue.render();app.project.close(CloseOptions.DO_NOT_SAVE_CHANGES);app.newProject();