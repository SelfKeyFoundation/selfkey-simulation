(async () => {
  
  'use strict'

  const jssim = require('js-simulator')
  const fs = require('fs')
  

  // Define Global Variables

  let KEY = 2500000000
  let users
  let sales

  // Define Agents

  let IDO = function(id, initial_x, initial_y, space, isSale) {
    let rank = 1
    jssim.SimEvent.call(this, rank)
    this.id = id
    this.space = space
    this.space.updateAgent(this, initial_x, initial_y)
    this.isSale = isSale
    this.size = new jssim.Vector2D(8, 8)
    this.color = '#00aa00'
    if (isSale) {
      this.color = '#ff0000'
      this.size = new jssim.Vector2D(10, 10)
    }
  }
  
  IDO.prototype = Object.create(jssim.SimEvent)

  IDO.prototype.update = async function(deltaTime) {
        
    let idos = this.space.findAllAgents()
    let pos = this.space.getLocation(this.id)

    if (this.isSale) {
      
      let lead = null

      if (lead != null) {

      } 

    } else {
      
      for (let ido of idos) {
        
        let ido_pos = this.space.getLocation(ido.id)
        
        if (ido != this && !ido.isSale) {
          
          
        }

      }

    }
    let csvOut = "boid [ " + this.id + "] is at (" + pos.x + ", " + pos.y + ") at time " + this.time + '",\r\n'
    await fs.appendFile("output.csv", csvOut)
    console.log("boid [ " + this.id + "] is at (" + pos.x + ", " + pos.y + ") at time " + this.time)
  }
  
  // Scheduler and Loop

  let scheduler = new jssim.Scheduler()
  scheduler.reset()

  let space = new jssim.Space2D()
  space.reset()

  for (let i = 0; i < 100; ++i) {
    
    let is_sale = i > 80
    let boid = new IDO(i, 0, 0, space, is_sale)
    
    scheduler.scheduleRepeatingIn(boid, 1)
  }
      
  // let canvas = document.getElementById("myCanvas")
  // console.log(canvas)
  setInterval(function() { 
    scheduler.update()
    // space.render('canvas')
    console.log('current simulation time: ' + scheduler.current_time)
    // document.getElementById("simTime").value = "Simulation Time: " + scheduler.current_time
  }, 100)

})()
