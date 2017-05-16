import { Meteor } from 'meteor/meteor';
import { Dogdata } from "/imports/api/data.js";
import Vision from "@google-cloud/vision";

// Import crucial modules

Meteor.methods({
    'searchDog' (image, dog) {
        const projectId = 'dogsight-163617';
        // Google Cloud Platform Project ID
        const vision = Vision({
            projectId: projectId,
            // Passes projectID
            keyFilename: '/Users/brian/Documents/Coding/dogsight/dogsight-e53028f34f5f.json'
            // Passes API keys
        });
        // Starts a Vision client
        var imageNoData = image.split(',')[1];
        var imageBase64 = Buffer.from(imageNoData, 'base64')
        // Creates a correctly formatted buffer with the base64 image string
        const visionData = vision.detectLabels(imageBase64)
            // Sends a label detection request to the Vision API and passes the image data
            .then(detection => {
                // When the API responds, run this function with the detection parameter
                Dogdata.insert({
                    Name: dog.name,
                    Gender: dog.gender,
                    Characteristics: detection[0],
                    Image: image
                })
                // Inserts a data entry into the Dogdata mongoDB collection
                return detection
                // Returns the label data
            });
        return visionData;
        // Returns the label data to the client
    }
})
