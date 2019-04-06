/* eslint no-unused-vars: ["warn", { "varsIgnorePattern": "ControllerDebug" }] */

class ControllerDebug extends Phaser.Scene {
	preload () {
		this.load.image('lightbluesky', 'assets/skies/lightblue.png');
	}

	create () {
		this.add.image(0, 0, 'lightbluesky').setOrigin(0);

		this.text = this.add.text(10, 30, '', { font: '16px Courier', fill: '#ffffff' });
	}

	update () {
		if (this.input.gamepad.total === 0) {
			return;
		}

		let debug = [];
		let pads = this.input.gamepad.gamepads;
		// let pads = this.input.gamepad.getAll();
		// let pads = navigator.getGamepads();

		for (let i = 0; i < pads.length; i++) {
			let pad = pads[i];

			if (!pad) {
				continue;
			}

			//  Timestamp, index. ID
			debug.push(pad.id);
			debug.push('Index: ' + pad.index + ' Timestamp: ' + pad.timestamp);

			//  Buttons

			let buttons = '';

			for (let b = 0; b < pad.buttons.length; b++) {
				let button = pad.buttons[b];

				buttons = buttons.concat('B' + button.index + ': ' + button.value + '  ');
				// buttons = buttons.concat('B' + b + ': ' + button.value + '  ');

				if (b === 8) {
					debug.push(buttons);
					buttons = '';
				}
			}

			debug.push(buttons);

			//  Axis

			let axes = '';

			for (let a = 0; a < pad.axes.length; a++) {
				let axis = pad.axes[a];

				axes = axes.concat('A' + axis.index + ': ' + axis.getValue() + '  ');
				// axes = axes.concat('A' + a + ': ' + axis + '  ');

				if (a === 1) {
					debug.push(axes);
					axes = '';
				}
			}

			debug.push(axes);
			debug.push('');
		}

		this.text.setText(debug);
	}
}
