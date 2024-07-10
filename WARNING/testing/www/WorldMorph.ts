// Assuming WorldMorph is already declared elsewhere

interface WorldRef {
    current: any; // Placeholder for the type of worldRef.current
}

declare class WorldMorph {
    constructor(world: WorldRef["current"]);
}


export default WorldMorph;