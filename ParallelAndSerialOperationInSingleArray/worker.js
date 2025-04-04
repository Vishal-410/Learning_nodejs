import { parentPort } from "worker_threads";


// Receive message from the parent
parentPort.on("message", (contents) => {
        // Send result back to parent
    parentPort.postMessage(
        contents.map(content => {
            
            return content;
        })
    );
});