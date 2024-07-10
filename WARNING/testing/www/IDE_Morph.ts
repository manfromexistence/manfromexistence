declare class IDE_Morph {
    constructor(options: {
        load: any; // Accepts submittedProject.xml or any value
        noExitWarning?: boolean; // Optional boolean property
        mode: "presentation"; // Must be "presentation" string
        design: "flat"; // Must be "flat" string
    });
    // No constructor declaration here, implementation is in IDE_Morph.ts
}

export default IDE_Morph;
