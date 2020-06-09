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

This project comes with multiple pre-defined 3D models, the GameBoy and the MarioLand game cartridge were the only original one. 

![GameBoy Model](https://lh3.googleusercontent.com/Ba-V20drCbrZKiz4NBV2wJD7A2Mm--CMkoGIYW9YABnHYr2nwjh2UXPXcGhOs_LrR2gucK7pDbZrOVGOSiHkfL1yttnNToeZ_gtRFFVGlNJxrpNASsiBVVX3NpN5an4viRymW8FIH3uZT6EhfwmAmaw7p595c6TNz7MFmip1Ku15YfkbPYfLKj4eyp0kVJMnBo4ZrjvMCvU4MJ491PH_zOCXxbf-r9yXFDwdHBX0mFsZTqWQ_C-4X_9z9xIO0KOFJjvbVjXSqHtOEYuBbsxlTSri_5K4cfHxOx_hMnO3Urg4YvGXEOksJkki-wl26StQDaXOFJ_QnlLJPGZ5g2XWlOe3C8B9ekdLJPyu_g-YCPDkuNt_jKPcsErBppCiRGB2_EeQ7uGej9kuN18X4n8NTfFfJFJBeImpzTwjfZJWOhjItBSZzddUwU8VHR9X45QpRR6tCdKRSvY7g_J3Ws6Koh8uo4T1eX6YWiN5tGwDWcsAeMJMBaojKOzhPMdz32fotdeUU-WKc7isWXCnmaH8fDBWoyaaDdmrEbHKNn3EASWciUlZrARJ2-Z3DCxa-llEUTgmtxERsaQ6c_Vjvq7c8RsX4QutcTUwQpSdVwK7OND3eeR7B53y-KPm3eSri-jS8gLM1snRplgvvckOPXsLN4FsDwhEHNVp3iaoYL4n-kmNuh6BZLb9TdlX3nGajw=w1920-h1080-no?authuser=0)

![Cartridge](https://lh3.googleusercontent.com/XQbd-SOPhh3QgYB0wa20oMuLzKLUazThRth8qGWf-K5Dw5v8jQk4pYe3yNa502WLmco6iPh4T_z0wONjmo3Pc5B2wUbKbPsbNJwo5i9YiIGjDFi90AEennSuReoR8hOQmhP2VVxsda4OF4JEyw1lUpnyEgfsWTzBFAi_1E2uMfOxHf2VnbsY6K_7e4YWUV32vIgc689W5IJ4HrlMXBPfqIvY7SX5cSBo2VQU8BXQFJCCA5soDXHs8Cd1khErMStLeRFeT_r8H-uhrV9jzclhJyqfaHV9gCrMo17lv1iDUDp9q57c07wYyxuxPayzr9rZ7oZAGN3kemKhaZ7qwfL44_jKTo9Gv1zz9S4eEsXfHY0irqd1yOmJ7tukCDTL1xO_DWc7SnyH8QiwYi1lgFphYIz814jJRxZfhniedstYU4jJG48Qr2O7krqg1yvwsg4Wr3yQbAW2aVmRRECaoFsePVi8j0XH3yrn1xEPiS1d0SnUevd1AhK6Bb6ukW4hdIRfn170sAecrVHxL1yZBCNaQ1lUBGgFUlt7cYwwBhXM-B_sMUcfy939-KRgyKUkU6uDmSBmkGfiW-dLSz9-cHc2nLj0j7WNjdSc7OS2znqb9dl66Uy9VDQraiOsIH5Jw-exbEygv9AxIVJ_pjFKvIt4rZF5adHMhaesqs8D-AznOKKYKsdgaP1F6Z_UzU1tDg=w1920-h1080-no?authuser=0)

Other models were found on [Google Poly's]([https://poly.google.com/](https://poly.google.com/)). The GameBoy and cartridge were made on Blender. 

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

### Modified version of emulator
I have modified multiple things inside the source code I forked, those being:

 - Added compability to emulator to work with ThreeJS CanvasTexture and update it everytime something is drawn on the screen canvas.
 - Added a volume controller into the AudioContext of the emulator.
 - Changed how controls are managed by no longer checking the deprecated keyCode and using key in the KeyboardEvent.
 - Removed useless KeyBoard check.
 - Replaced over **+500 ** var's to match the correct const or let.
