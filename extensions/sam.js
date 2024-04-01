import { SamJs } from "sam/dist/samjs.min.js";

class ScratchSAM {
    
    constructor() {
        this.pitch = 64;
        this.speed = 72;
        this.mouth = 128;
        this.throat = 128;
    }

    setPitch({value}) {
        this.pitch = value;
    };

    setSpeed({value}) {
        this.speed = value;
    };

    setMouth({value}) {
        this.mouth = value;
    };

    setThroat({value}) {
        this.throat = value;
    };

    speak({text}) {
        let opts = {
            debug: 1,
            pitch: 64,
            speed: 72,
            mouth: 128,
            throat: 128
        };
        var s = new SamJs(opts);
        s.speak(text);
    }

    getInfo() {
        return {
            "id": "SAM",
            "name": "SAM",
            "blocks": [
                {
                    "opcode": "setPitch",
                    "blockType": "command",
                    "text": "pitch [value]",
                    "arguments": {
                        "value": {
                            "type": "number",
                            "defaultValue": 64
                        },
                    }
                },
                {
                    "opcode": "setSpeed",
                    "blockType": "command",
                    "text": "speed [value]",
                    "arguments": {
                        "value": {
                            "type": "number",
                            "defaultValue": 72
                        },
                    }
                },
                {
                    "opcode": "setMouth",
                    "blockType": "command",
                    "text": "mouth [value]",
                    "arguments": {
                        "value": {
                            "type": "number",
                            "defaultValue": 128
                        },
                    }
                },
                {
                    "opcode": "setThroat",
                    "blockType": "command",
                    "text": "throat [value]",
                    "arguments": {
                        "value": {
                            "type": "number",
                            "defaultValue": 128
                        },
                    }
                },
                {
                    "opcode": "speak",
                    "blockType": "command",
                    "text": "speak [text]",
                    "arguments": {
                        "value": {
                            "type": "string",
                            "defaultValue": "Hello, my name is SAM."
                        },
                    }
                }
             ]
        }
    }

    /* add methods for blocks */
}

Scratch.extensions.register(new ScratchSAM())