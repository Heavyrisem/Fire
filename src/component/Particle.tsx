class Particle {
    temp: number;
    size: number;
    x: number = 0;
    y: number = 0;
    rotate: number = 0;
    shape: number = 1;
    speed: number = 0;
    color: string = "#ffffff";

    constructor(temp: number, size: number, position?: {x: number, y:number}, rotate?: number, shape?: number) {
        this.temp = temp;
        this.size = size;
        this.color = kelvinToHEX(temp_to_kelvin(this.temp))+("0" + Math.floor(150).toString(16)).substr(-2);
        
        position&& ( [this.x, this.y] = [position.x, position.y].map(v => (Math.floor(v)) ) );
        rotate&& (this.rotate = rotate * Math.PI / 180);
        shape&& (this.shape = Math.floor(shape));

        this.speed = Math.floor( Math.random() * 2 + 1 );
    }

    Update() {
        this.size -= this.speed;
        this.y -= this.speed;
        this.temp -= this.speed * 10;
        this.color = kelvinToHEX(temp_to_kelvin(this.temp))+("0" + Math.floor(150).toString(16)).substr(-2);
    }

    SetTemp(temp: number) {
        this.temp = temp;
        this.color = kelvinToHEX(temp_to_kelvin(temp))+("0" + Math.floor(150).toString(16)).substr(-2);
    }
}

  
function temp_to_kelvin(temp: number) {
    return temp + 273.15;
}

function kelvinToHEX (temp: number) {
  
    temp = temp / 100
    var red, blue, green
  
    if (temp <= 66) {
      red = 255
    } else {
      red = temp - 60
      red = 329.698727466 * Math.pow(red, -0.1332047592)
      if (red < 0) {
        red = 0
      }
      if (red > 255) {
        red = 255
      }
    }
  
    if (temp <= 66) {
      green = temp
      green = 99.4708025861 * Math.log(green) - 161.1195681661
      if (green < 0) {
        green = 0
      }
      if (green > 255) {
        green = 255
      }
    } else {
      green = temp - 60
      green = 288.1221695283 * Math.pow(green, -0.0755148492)
      if (green < 0) {
        green = 0
      }
      if (green > 255) {
        green = 255
      }
    }
  
    if (temp >= 66) {
      blue = 255
    } else {
      if (temp <= 19) {
        blue = 0
      } else {
        blue = temp - 10
        blue = 138.5177312231 * Math.log(blue) - 305.0447927307
        if (blue < 0) {
          blue = 0
        }
        if (blue > 255) {
          blue = 255
        }
      }
    }
  
    return "#"
    + ("0" + Math.floor(red).toString(16)).substr(-2)
    + ("0" + Math.floor(green).toString(16)).substr(-2)
    + ("0" + Math.floor(blue).toString(16)).substr(-2);
  }

export default Particle;