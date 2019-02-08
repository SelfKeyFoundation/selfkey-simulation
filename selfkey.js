  // Define Agents

  // Identity Owner Agent
  let IDO = function(id, initial_x, initial_y, space, isSale) {
    let rank = 1
    jssim.SimEvent.call(this, rank)
    this.id = id
    this.space = space
    this.space.updateAgent(this, initial_x, initial_y)
    this.velocity = new jssim.Vector2D(Math.random(), Math.random())
    this.isSale = isSale
    this.size = new jssim.Vector2D(8, 8)
    this.color = '#00aa00'
    if (isSale) {
      this.color = '#ff0000'
      this.size = new jssim.Vector2D(10, 10)
    }
  }
  
  IDO.prototype = Object.create(jssim.SimEvent)

  IDO.prototype.update = function(deltaTime) {
        
    let idos = this.space.findAllAgents()
    let pos = this.space.getLocation(this.id)

    if (this.isSale) {
      // console.log('GREEN')  
    } else {
      let buy = Math.random()
      if (buy > 0.998 && !this.isSale) {
        ++sales
        this.isSale = true
        this.id = 'PIMP'+Math.random()
        this.color = '#ff0000'
        this.size = new jssim.Vector2D(10, 10)
        let salePrice = Math.random(50,1000) * 1000000
        KEY = KEY - salePrice
        console.log('SALE @ ' + salePrice)
      }
    }

    pos.x += this.velocity.x
    pos.y += this.velocity.y

    // console.log("ido [ " + this.id + "] is at (" + pos.x + ", " + pos.y + ") at time " + this.time)
  }