import { Meteor } from 'meteor/meteor';
import { Dogdata } from "./data.js";
import Vision from "@google-cloud/vision";

Meteor.methods({
  'searchDog'(image) {
// Your Google Cloud Platform project ID
const projectId = 'dogsight-163617';

// Instantiates a client
const vision = Vision({
  projectId: projectId,
  keyFilename: '/Users/brian/Documents/Coding/dogsight/dogsight-e53028f34f5f.json'
});

var types = [
  'label'
];

var imageNoData = image.split(',')[1];
var imageBase64 = Buffer.from(imageNoData, 'base64')
const visionData = vision.detectLabels(imageBase64)
.then(detection => {
  console.log(detection)
  return detection
});

return visionData;




  }
})
