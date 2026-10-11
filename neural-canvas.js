/**
 * Neural Synapse Interactive Canvas
 * Simulates a dynamic neural network with moving nodes, synaptic connections,
 * traveling action potentials, and interactive mouse reactivity.
 */

class NeuralCanvas {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        
        this.nodes = [];
        this.pulses = [];
        this.shockwaves = [];
        this.maxNodes = 65;
        this.connectionDist = 140;
        this.mouseDist = 160;
        
        this.mouse = {
            x: null,
            y: null,
            isHovered: false
        };
        
        this.init();
    }
    
    init() {
        this.resize();
        this.createNodes();
        
        window.addEventListener('resize', () => {
            this.resize();
            this.createNodes();
        });
        
        window.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
            this.mouse.isHovered = true;
        });
        
        window.addEventListener('mouseleave', () => {
            this.mouse.isHovered = false;
            this.mouse.x = null;
            this.mouse.y = null;
        });
        
        window.addEventListener('click', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const clickY = e.clientY - rect.top;
            if (clickX >= 0 && clickX <= this.width && clickY >= 0 && clickY <= this.height) {
                this.addShockwave(clickX, clickY);
            }
        });
        
        // Periodic action potentials traveling along random synapses
        setInterval(() => this.spawnRandomPulse(), 600);
        
        this.animate();
    }
    
    resize() {
        const dpr = window.devicePixelRatio || 1;
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        
        this.canvas.width = this.width * dpr;
        this.canvas.height = this.height * dpr;
        this.canvas.style.width = `${this.width}px`;
        this.canvas.style.height = `${this.height}px`;
        
        this.ctx.scale(dpr, dpr);
        
        // Adjust node count according to screen size
        if (this.width < 768) {
            this.maxNodes = 35;
            this.connectionDist = 100;
        } else {
            this.maxNodes = 70;
            this.connectionDist = 145;
        }
    }
    
    createNodes() {
        this.nodes = [];
        for (let i = 0; i < this.maxNodes; i++) {
            this.nodes.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                vx: (Math.random() - 0.5) * 0.7,
                vy: (Math.random() - 0.5) * 0.7,
                radius: Math.random() * 2 + 1.5,
                baseRadius: Math.random() * 2 + 1.5,
                color: Math.random() > 0.4 ? 'rgba(6, 182, 212,' : 'rgba(139, 92, 246,', // Cyan or Violet
                energy: Math.random() * 0.5 + 0.2,
                connections: []
            });
        }
    }
    
    addShockwave(x, y) {
        this.shockwaves.push({
            x: x,
            y: y,
            radius: 5,
            maxRadius: 180,
            opacity: 0.8
        });
        
        // Excite nearby nodes
        this.nodes.forEach(node => {
            const dx = node.x - x;
            const dy = node.y - y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 180) {
                node.energy = 1.0;
                node.vx += (dx / dist) * 1.5;
                node.vy += (dy / dist) * 1.5;
            }
        });
    }
    
    spawnRandomPulse() {
        if (this.nodes.length < 2) return;
        const sourceIndex = Math.floor(Math.random() * this.nodes.length);
        const source = this.nodes[sourceIndex];
        
        if (source.connections && source.connections.length > 0) {
            const target = source.connections[Math.floor(Math.random() * source.connections.length)];
            this.pulses.push({
                x: source.x,
                y: source.y,
                targetX: target.x,
                targetY: target.y,
                targetNode: target,
                progress: 0,
                speed: 0.025 + Math.random() * 0.02,
                color: source.color
            });
        }
    }
    
    updateNodes() {
        for (let i = 0; i < this.nodes.length; i++) {
            const node = this.nodes[i];
            
            node.x += node.vx;
            node.y += node.vy;
            
            // Boundary bounce with slight damping
            if (node.x < 0) { node.x = 0; node.vx *= -1; }
            if (node.x > this.width) { node.x = this.width; node.vx *= -1; }
            if (node.y < 0) { node.y = 0; node.vy *= -1; }
            if (node.y > this.height) { node.y = this.height; node.vy *= -1; }
            
            // Mouse interaction (gentle attraction / alignment)
            if (this.mouse.isHovered && this.mouse.x !== null) {
                const dx = this.mouse.x - node.x;
                const dy = this.mouse.y - node.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < this.mouseDist && dist > 5) {
                    const force = (1 - dist / this.mouseDist) * 0.25;
                    node.vx += (dx / dist) * force;
                    node.vy += (dy / dist) * force;
                    node.energy = Math.max(node.energy, 0.7);
                }
            }
            
            // Friction damping
            node.vx *= 0.985;
            node.vy *= 0.985;
            
            // Natural energy decay
            if (node.energy > 0.2) {
                node.energy -= 0.008;
            }
            
            node.connections = [];
        }
        
        // Update shockwaves
        for (let i = this.shockwaves.length - 1; i >= 0; i--) {
            const sw = this.shockwaves[i];
            sw.radius += 4;
            sw.opacity -= 0.018;
            if (sw.opacity <= 0 || sw.radius >= sw.maxRadius) {
                this.shockwaves.splice(i, 1);
            }
        }
        
        // Update synaptic action potentials
        for (let i = this.pulses.length - 1; i >= 0; i--) {
            const p = this.pulses[i];
            p.progress += p.speed;
            if (p.progress >= 1) {
                if (p.targetNode) p.targetNode.energy = 0.9;
                this.pulses.splice(i, 1);
            }
        }
    }
    
    drawConnections() {
        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = i + 1; j < this.nodes.length; j++) {
                const n1 = this.nodes[i];
                const n2 = this.nodes[j];
                const dx = n2.x - n1.x;
                const dy = n2.y - n1.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < this.connectionDist) {
                    n1.connections.push(n2);
                    n2.connections.push(n1);
                    
                    const alpha = (1 - dist / this.connectionDist) * 0.28 * Math.max(n1.energy, n2.energy);
                    this.ctx.beginPath();
                    this.ctx.moveTo(n1.x, n1.y);
                    this.ctx.lineTo(n2.x, n2.y);
                    this.ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
                    this.ctx.lineWidth = 0.85;
                    this.ctx.stroke();
                }
            }
            
            // Draw connections to mouse
            if (this.mouse.isHovered && this.mouse.x !== null) {
                const n = this.nodes[i];
                const dx = this.mouse.x - n.x;
                const dy = this.mouse.y - n.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < this.mouseDist) {
                    const alpha = (1 - dist / this.mouseDist) * 0.45;
                    this.ctx.beginPath();
                    this.ctx.moveTo(n.x, n.y);
                    this.ctx.lineTo(this.mouse.x, this.mouse.y);
                    this.ctx.strokeStyle = `rgba(168, 85, 247, ${alpha})`;
                    this.ctx.lineWidth = 1.2;
                    this.ctx.stroke();
                }
            }
        }
    }
    
    drawPulses() {
        this.pulses.forEach(p => {
            const currX = p.x + (p.targetX - p.x) * p.progress;
            const currY = p.y + (p.targetY - p.y) * p.progress;
            
            this.ctx.beginPath();
            this.ctx.arc(currX, currY, 2.5, 0, Math.PI * 2);
            this.ctx.fillStyle = '#ffffff';
            this.ctx.shadowColor = '#38bdf8';
            this.ctx.shadowBlur = 8;
            this.ctx.fill();
            this.ctx.shadowBlur = 0; // Reset
        });
    }
    
    drawShockwaves() {
        this.shockwaves.forEach(sw => {
            this.ctx.beginPath();
            this.ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
            this.ctx.strokeStyle = `rgba(6, 182, 212, ${sw.opacity})`;
            this.ctx.lineWidth = 1.8;
            this.ctx.stroke();
        });
    }
    
    drawNodes() {
        for (let i = 0; i < this.nodes.length; i++) {
            const node = this.nodes[i];
            const currentRadius = node.baseRadius * (1 + node.energy * 0.5);
            
            // Glow aura
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, currentRadius * 2.2, 0, Math.PI * 2);
            this.ctx.fillStyle = `${node.color}${node.energy * 0.25})`;
            this.ctx.fill();
            
            // Core node
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);
            this.ctx.fillStyle = `${node.color}${node.energy * 0.8 + 0.2})`;
            this.ctx.fill();
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        this.updateNodes();
        this.drawConnections();
        this.drawPulses();
        this.drawShockwaves();
        this.drawNodes();
        
        requestAnimationFrame(() => this.animate());
    }
}

// Instantiate on DOM load
window.addEventListener('DOMContentLoaded', () => {
    new NeuralCanvas('neural-canvas');
});
