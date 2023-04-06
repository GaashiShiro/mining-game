import { Engine, Types } from './engine/engine.js';
import { AssetManager } from './engine/assetManager.js';
import { Miner } from './js/Miner.js';



const { Vector2:Vec2, V2 } = Types;

const main = async () => {    
    await Engine.setup('./settings.hjson');        
 
    const assetManager = new AssetManager(Engine);
    
    await assetManager.loadAsset({url: './assets/miner.asset.hjson'}, {constructors:{Miner}})
    const player = assetManager.spawn('miner-actor', {position:Engine.edges.center})


    console.log(player)
    player.init()
    
    Engine.start();
}

Engine.init(main);