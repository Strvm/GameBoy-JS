# GameBoy-JS!

GameBoy-JS is a original GameBoy emulator based JavaScript represented with a 3D GameBoy model made in **Blender** and implemented in the web with the [three.js](https://github.com/mrdoob/three.js/) library. 

The emulator is a fork of the GameBoy emulator "[GameBoy-Online](https://github.com/chrismaltby/GameBoy-Online)" with multiple modifications to make this project work.

This emulator will only work with one game per session. Game can be changed by changing **romPath** in [mobile.js]([https://github.com/Strvm/GameBoy-JS/blob/master/scripts/emulator/js/other/mobile.js](https://github.com/Strvm/GameBoy-JS/blob/master/scripts/emulator/js/other/mobile.js)) file by changing the path of another game (only accepts __**.gb**__ files).




# Things that were done

### Graphics
This project has the ability to "spawn" 3D objects (.GLB files) into the scene with **three.js**. It uses the **GLTF** loader paired with **Draco** loader to compress the model and make it lighter. To spawn 3D objects into the scene either use the settings tab in the web browser or use the **spawnPoly** function. 
```js
 spawnPoly(type, amount, scale, array, scene);
```
**spawnPoly** method takes 5 parameters:

 - **type**: The 3D object file name without extension(all 3D objects will be stored in the image folder).
 - **amount**: The amount of models to be spawned in.
 - **scale**: How scaled down the model should be.
 - **array**: The array in which those models should be stored in. Later used to move those specific models.
 - **scene**: The scene in which the model should be spawned in.

### Customization
With this emulator you are granted the ability to customize gameplay and graphics settings through the menu that can be accessed through the menu button on the top right of the screen. Those are settings you can modify:

 - KeyBoard keys: You can modify keys to those that you want:
	 - Up 
	 - Right
	 - Down
	 - Left
	 - A Button
	 - B Button
	 - Start Button
	 - Select Button
 -  FPS Checkbox: wether or not the frames per second display monitor should be displayed or not (default is set to true)
 - Background Movement: wether or not background objects should be moving.
 - Background Objects: Wether or not there should be objects display (other than the GameBoy) displayed in the scene.
 - Volume control: you can modify the sound of the GameBoy.
 - Background changer: upload an image of your choice to display it as the new background.

