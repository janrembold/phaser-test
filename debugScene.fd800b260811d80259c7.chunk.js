"use strict";(self.webpackChunkphaser_test=self.webpackChunkphaser_test||[]).push([[444],{426:(e,s,a)=>{a.r(s),a.d(s,{default:()=>t});class t extends Phaser.Scene{constructor(){super({key:"DebugScene"})}create(){this.fpsText=this.add.text(0,0,"Loading...",{color:"black",fontSize:"25px"})}update(){this.fpsText.setText(`fps: ${Math.floor(this.game.loop.actualFps)} - zoom: ${this.cameras.main.zoom}, camX: ${this.cameras.main.scrollX}, camY: ${this.cameras.main.scrollY} - gaem w/h: ${this.game.scale.width}/${this.game.scale.height}`)}}}}]);