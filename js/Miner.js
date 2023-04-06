import { Enum_PlayerMovement, Player } from "../engine/player.js";
import { Engine, Types } from '../engine/engine.js';

const { Vector2:Vec2, V2 } = Types;
export class Miner extends Player{
    constructor(o){
        super(o);
    }
    init(){
        this.attachKeyboard();
        this.isAirbourne = true;
        this.movement.acceleration = 0.1;
        this.movement.maxVelocity = 10;
        this.movement.friction = 0.1;
        this.isJumping = false;
        this.isFalling = false;
        this.equippedItem = 'pick';
        console.log(this.movement)
        //this.movementType = Enum_PlayerMovement.None;
    }
    tick(){
        // add death
        const keys = this.controllers.keyboard.keyState;
        this.isFalling = this.velocity.y > 0.5;
        if (this.isFalling) this.flipbooks[0].play(this.equippedItem + 'fall', true);
        if (this.position.y > 1080-90) {        //1080 is edge of screen, 90 is the offset of player
            this.isJumping = false;
            this.isAirbourne = false;
            this.velocity.y = 0;
        }
        if (keys.left == false && keys.right == false) {
            if (!this.isJumping) this.flipbooks[0].play(this.equippedItem + 'idle', true);
            if (!this.isAirbourne) {
                this.velocity.mulScalar(1 - this.movement.friction);
            }
        }
        if (keys.left) {
            if (this.velocity.x > 5) {
                this.velocity.x = 5
            }
            if (!this.isFalling && !this.isAirbourne) {
                this.flipbooks[0].play(this.equippedItem + 'walk', true);
            }
            this.renderHints.mirrorX = true;
        }
        if (keys.right) {
            if (this.velocity.x > 5) {
                this.velocity.x = 5
            } 
            if (!this.isFalling && !this.isAirbourne) {
                this.flipbooks[0].play(this.equippedItem + 'walk', true);
            }
            this.renderHints.mirrorX = false;
        }
        
        if (keys.up) {
            if (this.isAirbourne == false && this.isJumping == false){
                this.velocity.add(V2(0,-15))  //applies jumping force
                this.isAirbourne = true;
                this.isJumping = true;
                this.flipbooks[0].play(this.equippedItem + 'jump', true);
            }
            this.cancelMovement()
        }
        if (keys.down) {
            this.cancelMovement();
        }
        if (this.isAirbourne) {
            this.velocity.add(V2(0,0.2))  //applies gravity
        }
        super.tick()
    }
}