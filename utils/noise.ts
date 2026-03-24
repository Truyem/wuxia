
/**
 * Perlin Noise Implementation with fBm (Fractional Brownian Motion)
 * Optimized for Wuxia World procedural generation.
 */

class Noise {
    p: number[] = new Array(512);
    
    constructor(seed: number = Math.random()) {
        const p = new Array(256);
        for (let i = 0; i < 256; i++) p[i] = i;
        
        // Shuffle based on seed
        let m = seed;
        for (let i = 255; i > 0; i--) {
            m = (m * 1103515245 + 12345) & 0x7fffffff;
            const j = m % (i + 1);
            [p[i], p[j]] = [p[j], p[i]];
        }
        
        for (let i = 0; i < 512; i++) {
            this.p[i] = p[i % 256];
        }
    }

    fade(t: number) { return t * t * t * (t * (t * 6 - 15) + 10); }
    lerp(t: number, a: number, b: number) { return a + t * (b - a); }
    grad(hash: number, x: number, y: number, z: number) {
        const h = hash & 15;
        const u = h < 8 ? x : y;
        const v = h < 4 ? y : h === 12 || h === 14 ? x : z;
        return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
    }

    perlin(x: number, y: number, z: number = 0) {
        const X = Math.floor(x) & 255;
        const Y = Math.floor(y) & 255;
        const Z = Math.floor(z) & 255;
        
        x -= Math.floor(x);
        y -= Math.floor(y);
        z -= Math.floor(z);
        
        const u = this.fade(x);
        const v = this.fade(y);
        const w = this.fade(z);
        
        const A = this.p[X] + Y, AA = this.p[A] + Z, AB = this.p[A + 1] + Z;
        const B = this.p[X + 1] + Y, BA = this.p[B] + Z, BB = this.p[B + 1] + Z;
        
        return this.lerp(w, this.lerp(v, this.lerp(u, this.grad(this.p[AA], x, y, z),
                                         this.grad(this.p[BA], x - 1, y, z)),
                               this.lerp(u, this.grad(this.p[AB], x, y - 1, z),
                                         this.grad(this.p[BB], x - 1, y - 1, z))),
                       this.lerp(v, this.lerp(u, this.grad(this.p[AA + 1], x, y, z - 1),
                                         this.grad(this.p[BA + 1], x - 1, y, z - 1)),
                               this.lerp(u, this.grad(this.p[AB + 1], x, y - 1, z - 1),
                                         this.grad(this.p[BB + 1], x - 1, y - 1, z - 1))));
    }

    fBm(x: number, y: number, octaves: number = 6, persistence: number = 0.5) {
        let total = 0;
        let frequency = 1;
        let amplitude = 1;
        let maxValue = 0;
        for (let i = 0; i < octaves; i++) {
            total += this.perlin(x * frequency, y * frequency) * amplitude;
            maxValue += amplitude;
            amplitude *= persistence;
            frequency *= 2;
        }
        return total / maxValue;
    }
}

export const createNoise = (seed?: number) => new Noise(seed);
