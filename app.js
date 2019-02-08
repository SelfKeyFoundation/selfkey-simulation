(() => {
  
	'use strict'

	const jssim = require('js-simulator')
	const fs = require('fs')
	const pythony = require('./helpers/pythony.js')


	// Define Global Variables

	let KEY = 2500000000
	let KEY_PRICE = 0.0028

	let users = 0
	let sales = 0

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
		this.salePrice = 0
		if (isSale) {
			this.color = '#ff0000'
			this.size = new jssim.Vector2D(10, 10)
		}
	}

	IDO.prototype = Object.create(jssim.SimEvent)

	IDO.prototype.update = async function(deltaTime) {

		// let idos = this.space.findAllAgents()
		// let pos = this.space.getLocation(this.id)

		if (this.isSale) {
			// console.log('GREEN')  
		} else {
			let buy = Math.random()
			if (buy > 0.998 && !this.isSale) {
				++sales
				this.isSale = true
				this.id = Math.random()
				this.color = '#ff0000'
				this.size = new jssim.Vector2D(10, 10)
				this.salePrice = Math.random(50,1000) * 1000000
				KEY = KEY - this.salePrice
				console.log('SALE @ ' + this.salePrice)
			}
		}

		// pos.x += this.velocity.x
		// pos.y += this.velocity.y

		let pRes = await pythony(this.salePrice, 'ptest.py')
		console.log(pRes[0])

		let csvOut = this.id + ',' + pRes[0].message + ',' + pRes[0].num + ',' + this.isSale + ',' + this.salePrice + ',' + this.time + ',\r\n'
		fs.appendFileSync("output.csv", csvOut)
		return console.log(csvOut)
	
	}
        
	// reset things

	let scheduler = new jssim.Scheduler()
	scheduler.reset()

	let space = new jssim.Space2D()
	space.reset()


	// create initial IDO agents

	// for (let i = 0; i < users; ++i) {
	//   let hu = users/2
	//   let is_sale = i > hu
	//   let ido = new IDO(i, i, i, space, false)
	  
	//   scheduler.scheduleRepeatingIn(ido, 1)
	// }


	// Set Canvas

	// let canvas = document.getElementById("myCanvas")

	setInterval(() => { 
		let rando = Math.random()
		for (let i = 0; i < 10; ++i) {
			if (rando > 0.8) {
				let ido = new IDO(Math.random(), 1, 1, space, false)
				scheduler.scheduleRepeatingIn(ido, 1)
				++users
			}
		}

		(rando > 0.2) ? KEY_PRICE = KEY_PRICE + 0.001 : KEY_PRICE = KEY_PRICE - 0.001

		scheduler.update()

		//space.render(canvas)

		// console.log('current simulation time: ' + scheduler.current_time)

		// document.getElementById("simTime").value = "Elapsed Time: " + scheduler.current_time
		// document.getElementById("simKEY").value = "KEY Supply: " + KEY
		// document.getElementById("simKEYPrice").value = "KEY Price: " + KEY_PRICE
		// document.getElementById("simUsers").value = "Total Users: " + users
		// document.getElementById("simSales").value = "Total Sales: " + sales

		let turnCSV = scheduler.current_time + ',' + KEY + ',' + KEY_PRICE + ',' + users + ',' + sales + ',\r\n'
		fs.appendFileSync("turns.csv", turnCSV)

		console.log("Elapsed Time: " + scheduler.current_time)
		console.log("KEY Supply: " + KEY)
		console.log("KEY Price: " + KEY_PRICE)
		console.log("Total Users: " + users)
		console.log("Total Sales: " + sales)


	}, 100)

})()
