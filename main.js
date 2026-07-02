// GLOBAL STATE
const state = {
    soundEnabled: false,
    latency: 12,
    exp: 9820,
    accentGlow: true,
    matrixActive: false
};

// DOM ELEMENTS
const neuralCanvas = document.getElementById('neural-canvas');
const cursor = document.getElementById('custom-cursor');
const cursorDot = document.getElementById('custom-cursor-dot');
const soundToggleBtn = document.getElementById('sound-toggle');
const expCounter = document.getElementById('exp-counter');
const localClock = document.getElementById('local-clock');

// INITIALIZE SYSTEM
document.addEventListener('DOMContentLoaded', () => {
    initLucide();
    initNeuralCanvas();
    initCustomCursor();
    initMagneticElements();
    initClock();
    initBentoTilt();
    initSkillsTabs();
    initProjectModal();
    initAchievementsTracker();
    initJourneyTimeline();
    initContactForm();
    initCommandMenu();
    initHeroTerminal();
    initScrollAnimations();
});

// INITIALIZE LUCIDE ICONS
function initLucide() {
    lucide.createIcons();
}

// 1. NEURAL CANVAS PARTICLES BACKGROUND (Living Neural Net)
let particles = [];
let netCtx = null;
const mouse = { x: null, y: null, radius: 150 };

function initNeuralCanvas() {
    if (!neuralCanvas) return;
    netCtx = neuralCanvas.getContext('2d');
    resizeCanvas();
    
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
    window.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    // Create particles
    const particleCount = Math.min(100, Math.floor((window.innerWidth * window.innerHeight) / 15000));
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    requestAnimationFrame(animateNeuralCanvas);
}

function resizeCanvas() {
    neuralCanvas.width = window.innerWidth;
    neuralCanvas.height = window.innerHeight;
}

class Particle {
    constructor() {
        this.x = Math.random() * neuralCanvas.width;
