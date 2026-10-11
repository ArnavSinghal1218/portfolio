/**
 * Main application scripts for Arnav Singhal's Portfolio
 * - Navigation and mobile menu
 * - Category filter for projects
 * - Project deep-dive modal
 * - Interactive counter animations
 * - Copy to clipboard helper
 */

// Project Data Details for Modals
const PROJECT_DETAILS = {
    'deeppet': {
        title: "Evaluating Fourier Layers in DeepPET Architecture",
        subtitle: "M.Sc. Thesis Project • Universität Heidelberg (Major: Machine Learning & Deep Learning)",
        tags: ["Scientific ML", "Medical Imaging", "PyTorch", "FFT Convolutions", "TensorBoard", "GCP"],
        stats: [
            { label: "Relative Error Reduction", value: "-34%" },
            { label: "Validation Loss Drop", value: "-62%" },
            { label: "Target Equation", value: "2D Helmholtz" },
            { label: "Architecture", value: "Spectral U-Net" }
        ],
        overview: "Designed an FFT-augmented U-Net (DeepPET) architecture integrating spectral convolution layers with hybrid fusion and skip connections for 2D wave-field reconstruction in forward modelling of the 2D Helmholtz equation.",
        keyAchievements: [
            "Introduced global Fourier domain convolutions directly into the encoder-decoder bottleneck to resolve high-frequency acoustic wave propagation errors.",
            "Best-performing architecture variant achieved a 34% reduction in mean relative error and a 62% reduction in validation loss versus the baseline standard convolutional model.",
            "Conducted multimode evaluation and tracked physics-aware metrics in TensorBoard across diverse wave-speed velocity distributions.",
            "Demonstrated that spectral representation preserves wave phase alignment and prevents error accumulation over long propagation distances."
        ],
        codeSnippet: `# DeepPET Spectral Convolution Layer Concept
import torch
import torch.nn as nn

class SpectralConv2d(nn.Module):
    def __init__(self, in_channels, out_channels, modes1, modes2):
        super().__init__()
        self.modes1, self.modes2 = modes1, modes2
        self.weights = nn.Parameter(torch.cfloat(torch.randn(in_channels, out_channels, modes1, modes2)))
        
    def forward(self, x):
        # 2D Fast Fourier Transform
        x_ft = torch.fft.rfft2(x)
        # Multiply relevant Fourier modes
        out_ft = torch.zeros_like(x_ft)
        out_ft[:, :, :self.modes1, :self.modes2] = torch.einsum(
            "bixy,ioxy->boxy", x_ft[:, :, :self.modes1, :self.modes2], self.weights
        )
        # Return to spatial domain via Inverse FFT
        return torch.fft.irfft2(out_ft, s=(x.size(-2), x.size(-1)))`
    },
    'coronary': {
        title: "Coronary Arteries Reconstruction from CTA Dataset",
        subtitle: "Cardiovascular Medical Image Processing • Heidelberg University",
        tags: ["Medical Imaging", "SimpleITK", "CNN Orientation Tracker", "3D Reconstruction", "Python"],
        stats: [
            { label: "Centerline Deviation", value: "2.71 mm" },
            { label: "Within 5mm Boundary", value: "100%" },
            { label: "Format", value: "CTA (.mhd)" },
            { label: "Output Tensor", value: "M × N × 4" }
        ],
        overview: "Built an end-to-end vascular extraction pipeline that processes Cardiac Computed Tomography Angiography (CTA) volumes (.mhd) with SimpleITK to trace 3D arterial centerlines and detect clinical stenosis.",
        keyAchievements: [
            "Leveraged SimpleITK to preprocess complex .mhd CTA volumes, performing voxel spacing normalization and intensity windowing.",
            "Trained a convolutional orientation tracker to predict direction vectors along tortuous coronary vessel branches.",
            "Generated dense 3D reconstructions (M×N×4 format) from extracted vessel coordinates.",
            "Achieved 2.71 mm mean centerline deviation, with 100% of tracked points falling safely within 5 mm of ground truth.",
            "Explored coronary stenosis simulations to model pathological narrowing for diagnostic cardiovascular assessment."
        ],
        codeSnippet: `# SimpleITK Centerline & Intensity Normalization
import SimpleITK as sitk
import numpy as np

def preprocess_cta_volume(mhd_path):
    image = sitk.ReadImage(mhd_path)
    # Resample to isotropic 0.5mm voxels
    resampler = sitk.ResampleImageFilter()
    resampler.SetOutputSpacing([0.5, 0.5, 0.5])
    resampled = resampler.Execute(image)
    
    # Cardiac Hounsfield Unit windowing [0 to 800 HU]
    nda = sitk.GetArrayFromImage(resampled)
    clamped = np.clip(nda, 0, 800) / 800.0
    return clamped`
    },
    'pubmedqa': {
        title: "PubMedQA: Biomedical Literature Search & QA System",
        subtitle: "Biomedical NLP & Semantic Information Retrieval • Heidelberg University",
        tags: ["Biomedical NLP", "txtai", "PubMedBERT", "DistilBERT", "Streamlit", "HuggingFace"],
        stats: [
            { label: "Articles Indexed", value: "9,999" },
            { label: "Corpus Span", value: "2013 - 2023" },
            { label: "Embedding Model", value: "PubMedBERT" },
            { label: "Extractor", value: "DistilBERT QA" }
        ],
        overview: "Developed a two-stage retrieve-then-extract biomedical question-answering system indexing 9,999 PubMed abstracts to return direct scientific answers to natural language clinical queries.",
        keyAchievements: [
            "Parsed and indexed 9,999 PubMed titles and abstracts (2013-2023) keyed by PMID as dense vectors in txtai.",
            "Applied domain-adapted PubMedBERT embeddings to capture specialized clinical terminology instead of brittle keyword matching.",
            "Built a retrieve-then-extract architecture: semantic search retrieves the top-k most relevant abstracts, and a DistilBERT (SQuAD-distilled) model extracts targeted answers.",
            "Containerized and deployed an interactive Streamlit application with intuitive querying.",
            "Evaluated responses with Jaccard similarity against reference answers and performed diagnostic error analysis on complex clinical queries."
        ],
        codeSnippet: `# Two-Stage Retrieve-Then-Extract Pipeline
from txtai.embeddings import Embeddings
from transformers import pipeline

# 1. Dense Semantic Retrieval
embeddings = Embeddings({"path": "microsoft/BiomedNLP-PubMedBERT-base-uncased-abstract"})
embeddings.load("pubmed_index")

# 2. Extract Answers from Top Contexts
qa_pipe = pipeline("question-answering", model="distilbert-base-cased-distilled-squad")

def answer_biomedical_query(question):
    # Retrieve top 3 semantically aligned PubMed abstracts
    results = embeddings.search(question, limit=3)
    combined_context = " ".join([r["text"] for r in results])
    return qa_pipe(question=question, context=combined_context)`
    },
    'bcos': {
        title: "Explainable Emotion Detection Using B-Cos Networks",
        subtitle: "Interpretable Deep Learning & Computer Vision • FER2013 Benchmark",
        tags: ["Computer Vision", "Explainable AI", "PyTorch", "B-Cos Conv", "FER2013", "Healthcare AI"],
        stats: [
            { label: "Training Images", value: "28,709" },
            { label: "Test Set", value: "7,178" },
            { label: "Classes", value: "7 Emotions" },
            { label: "Interpretability", value: "Intrinsic" }
        ],
        overview: "Benchmarked standard CNNs against intrinsically explainable B-cos neural networks for 7-class facial emotion recognition on the FER2013 dataset to verify whether interpretability requires accuracy trade-offs.",
        keyAchievements: [
            "Trained both standard and B-cos CNNs under identical training conditions (SGD with momentum, cross-entropy, batch size 64, learning rate scheduling, horizontal-flip augmentation).",
            "Demonstrated that B-cos convolutions match baseline accuracy, with small marginal gains on happiness and anger classes.",
            "Generated gradient-based activation visual maps showing that B-cos networks focus precisely on medically informative landmarks (eyes and mouth), whereas standard CNNs exhibit noisy, diffuse heatmaps.",
            "Demonstrated the clinical utility of self-interpretable architectures in sensitive healthcare and patient-monitoring domains."
        ],
        codeSnippet: `# B-Cos Transformation vs Standard Dot Product
import torch
import torch.nn as nn
import torch.nn.functional as F

class BcosConv2d(nn.Module):
    def __init__(self, in_c, out_c, kernel_size, B=2.0):
        super().__init__()
        self.B = B
        self.weight = nn.Parameter(torch.randn(out_c, in_c, kernel_size, kernel_size))
        
    def forward(self, x):
        # Normalizes weight & input vectors to compute cosine angle alignment
        # Scaled by magnitude: ||x|| * cos^B(theta)
        w_norm = F.normalize(self.weight, p=2, dim=[1, 2, 3])
        # Preserves directional alignment for transparent feature maps
        return F.conv2d(x, w_norm) * (torch.clamp(F.conv2d(x, w_norm), min=0) ** (self.B - 1))`
    },
    'pricing': {
        title: "Simulated Dynamic Pricing Engine",
        subtitle: "Production ML Pipeline & Microservice Deployment",
        tags: ["Machine Learning", "Random Forest", "Streamlit", "Docker", "GCP", "Python"],
        stats: [
            { label: "RMSE", value: "2.08" },
            { label: "MAE", value: "1.67" },
            { label: "R² Score", value: "0.49" },
            { label: "Samples", value: "10,000+" }
        ],
        overview: "Architected a real-time dynamic pricing engine predicting transportation fares from complex contextual signals including weather, passenger demand, spatial distance, and vehicle categories.",
        keyAchievements: [
            "Synthesized a realistic domain cost model for 10k+ trip samples incorporating base fees, per-km rates, and multi-tier surge multipliers.",
            "Experimented with multiple regressors (Linear Regression, Gradient Boosting, Random Forest) on an 80/20 train/test split, selecting Random Forest for optimal error metrics (RMSE 2.08, MAE 1.67).",
            "Packaged the trained model and inference logic into a containerized Docker microservice.",
            "Deployed an interactive Streamlit dashboard allowing users to query instant fare estimates for any arbitrary real-world scenario."
        ],
        codeSnippet: `# Dockerfile for Containerized Streamlit ML App
FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8501
ENTRYPOINT ["streamlit", "run", "app.py", "--server.port=8501", "--server.address=0.0.0.0"]`
    },
    'vit-helmholtz': {
        title: "Architectural Analysis of Vision Transformers for Helmholtz Equation Reconstruction",
        subtitle: "M.Sc. Advanced Practical • Universität Heidelberg (Grade 1.3 / High Distinction, 8 ECTS)",
        tags: ["Vision Transformers", "Scientific ML", "Helmholtz PDE", "Self-Attention", "PyTorch", "Deep Learning"],
        stats: [
            { label: "Coursework Grade", value: "1.3" },
            { label: "Academic Credits", value: "8 ECTS" },
            { label: "Target PDE", value: "2D Helmholtz" },
            { label: "Attention Model", value: "Patch Multi-Head" }
        ],
        overview: "Conducted an in-depth architectural study evaluating Vision Transformers (ViT) as neural operators for forward modelling of the 2D Helmholtz equation, investigating how patch tokenization and global self-attention capture acoustic wave dispersion relative to spatial CNNs.",
        keyAchievements: [
            "Benchmarked patch-based multi-head self-attention mechanisms against standard convolutional filters on forward wave-field propagation.",
            "Evaluated patch resolution trade-offs (4x4 vs 8x8 tokens) on high-frequency wavenumber resolution, phase coherence, and gradient stability.",
            "Awarded Grade 1.3 (High Distinction) by the Faculty of Mathematics and Computer Science at Heidelberg University.",
            "Synthesized findings that directly bridged into the hybrid spectral convolution design of the graduate DeepPET master's thesis."
        ],
        codeSnippet: `# Vision Transformer Patch Embedding for 2D Helmholtz Field
import torch
import torch.nn as nn

class HelmholtzViTPatchEmbed(nn.Module):
    def __init__(self, img_size=128, patch_size=8, in_chans=1, embed_dim=256):
        super().__init__()
        self.num_patches = (img_size // patch_size) ** 2
        # Project spatial 2D wave patches into latent token embeddings
        self.proj = nn.Conv2d(in_chans, embed_dim, kernel_size=patch_size, stride=patch_size)
        self.pos_embed = nn.Parameter(torch.randn(1, self.num_patches, embed_dim) * 0.02)
        
    def forward(self, x):
        # x: [B, 1, 128, 128] velocity/wave input
        B = x.shape[0]
        tokens = self.proj(x).flatten(2).transpose(1, 2)  # [B, num_patches, embed_dim]
        tokens = tokens + self.pos_embed
        return tokens`
    },
    'entrepreneurship': {
        title: "Certified Entrepreneurial Skills & Technology Innovation",
        subtitle: "hei_INNOVATION Transferagentur & heiSKILLS • Universität Heidelberg (510 Hours / 17 ECTS)",
        tags: ["Entrepreneurship", "hei_INNOVATION", "510 Hours", "Product Prototyping", "Design Thinking", "Leadership"],
        stats: [
            { label: "Total Workload", value: "510 Hours" },
            { label: "Academic Credits", value: "17 ECTS / LP" },
            { label: "Software Lab", value: "5 LP Prototype" },
            { label: "Venture Studies", value: "6 LP Modules" }
        ],
        overview: "Completed a comprehensive 510-hour qualification in technology commercialization, venture creation, team leadership, and product prototyping organized by hei_INNOVATION (Heidelberg University's official technology transfer agency).",
        keyAchievements: [
            "Student Innovation Lab (5 LP): Designed and engineered end-to-end software prototypes using user journey mapping, iterative user testing, and agile sprints.",
            "Leadership & Teamdynamics (3 LP): Trained in high-performance cross-functional team management, psychological safety, and agile delivery (complements leadership of 5 analysts at Toluna).",
            "Entrepreneurship for Beginners I & II (6 LP): Mastered business model canvases, go-to-market strategies, intellectual property assessment, and financial modeling.",
            "Pitch Training & Experience Design Thinking (3 LP): Delivered structured investor pitches and developed empathy-driven product interfaces for complex technical systems."
        ],
        codeSnippet: `# hei_INNOVATION Certified Qualification Modules (510 Workload Hours)
ENTREPRENEURIAL_CREDENTIALS = {
    "Transferagentur": "hei_INNOVATION - Universität Heidelberg",
    "Total_Workload": "510 Hours (17 ECTS / LP)",
    "Certified_Modules": [
        {"name": "Student Innovation Lab: Software Practical (prototyping)", "credits": "5 LP"},
        {"name": "Entrepreneurship for Beginners I & II", "credits": "6 LP"},
        {"name": "Leadership & Teamdynamics", "credits": "3 LP"},
        {"name": "Experience Design Thinking", "credits": "2 LP"},
        {"name": "Pitch Training", "credits": "1 LP"}
    ],
    "Signatories": [
        "Prof. Dr. Katja Patzel-Mattern (Prorektorin Innovation & Transfer)",
        "Dr. Jan Heidelberger (Geschäftsführer heiSKILLS)"
    ]
}`
    }
};

// Initialize Filtering for Projects
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.project-filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');

            filterBtns.forEach(b => {
                b.classList.remove('active', 'bg-cyan-500', 'text-slate-950', 'border-cyan-400');
                b.classList.add('bg-slate-900/80', 'text-slate-400', 'border-slate-800');
            });

            btn.classList.add('active', 'bg-cyan-500', 'text-slate-950', 'border-cyan-400');
            btn.classList.remove('bg-slate-900/80', 'text-slate-400', 'border-slate-800');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category.includes(filter)) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 20);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(15px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 200);
                }
            });
        });
    });
}

// Modal handling
function initProjectModal() {
    const modal = document.getElementById('project-modal');
    const modalContent = document.getElementById('modal-dynamic-content');
    const closeModalBtn = document.getElementById('modal-close-btn');
    const openModalBtns = document.querySelectorAll('.open-project-modal');

    if (!modal || !modalContent) return;

    function openModal(projectId) {
        const data = PROJECT_DETAILS[projectId];
        if (!data) return;

        modalContent.innerHTML = `
            <div class="space-y-6">
                <!-- Header -->
                <div>
                    <div class="flex flex-wrap items-center gap-2 mb-2">
                        ${data.tags.map(t => `<span class="px-2.5 py-0.5 text-xs font-mono rounded bg-cyan-950/60 text-cyan-300 border border-cyan-800/60">${t}</span>`).join('')}
                    </div>
                    <h3 class="text-2xl font-bold text-white mb-1">${data.title}</h3>
                    <p class="text-sm text-cyan-400 font-mono">${data.subtitle}</p>
                </div>

                <!-- Stats Grid -->
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                    ${data.stats.map(s => `
                        <div class="text-center">
                            <div class="text-xl font-bold text-cyan-300 font-mono">${s.value}</div>
                            <div class="text-xs text-slate-400">${s.label}</div>
                        </div>
                    `).join('')}
                </div>

                <!-- Overview -->
                <div>
                    <h4 class="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">Project Overview</h4>
                    <p class="text-slate-300 text-sm leading-relaxed">${data.overview}</p>
                </div>

                <!-- Key Technical Highlights -->
                <div>
                    <h4 class="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">Key Technical Contributions</h4>
                    <ul class="space-y-2 text-sm text-slate-300">
                        ${data.keyAchievements.map(a => `
                            <li class="flex items-start gap-2">
                                <span class="text-cyan-400 mt-1 font-bold">›</span>
                                <span>${a}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>

                <!-- Code / Architecture Architecture Snippet -->
                <div>
                    <h4 class="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">Pipeline Architecture & Implementation</h4>
                    <div class="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto">
                        <pre><code>${data.codeSnippet}</code></pre>
                    </div>
                </div>
            </div>
        `;

        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }

    openModalBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = btn.getAttribute('data-project');
            openModal(projectId);
        });
    });

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });
}

// Copy to Clipboard Utility
function initCopyHelpers() {
    const copyEmailBtns = document.querySelectorAll('.copy-email-btn');
    const toast = document.getElementById('copy-toast');

    copyEmailBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const email = "arnavsinghal637@gmail.com";
            navigator.clipboard.writeText(email).then(() => {
                if (toast) {
                    toast.classList.remove('translate-y-20', 'opacity-0');
                    toast.classList.add('translate-y-0', 'opacity-100');
                    setTimeout(() => {
                        toast.classList.remove('translate-y-0', 'opacity-100');
                        toast.classList.add('translate-y-20', 'opacity-0');
                    }, 3000);
                }
            });
        });
    });
}

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        const links = mobileMenu.querySelectorAll('a');
        links.forEach(l => {
            l.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }
}

// Stats Counter on Scroll
function initCounterObserver() {
    const counters = document.querySelectorAll('.stat-number');
    let animated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                counters.forEach(counter => {
                    const target = counter.getAttribute('data-target');
                    counter.innerText = target;
                });
            }
        });
    }, { threshold: 0.3 });

    const statsSection = document.getElementById('hero-stats');
    if (statsSection) observer.observe(statsSection);
}

// Technical Case Studies Full Articles Data
const CASE_STUDIES_DATA = {
    'deeppet': {
        title: "Evaluating Fourier Layers in DeepPET: Tackling Phase Dispersion in Helmholtz Wave-Field Modeling",
        author: "Arnav Singhal • M.Sc. Thesis Research, Universität Heidelberg",
        badge: "Scientific Machine Learning",
        readTime: "6 min read",
        stats: [
            { label: "Relative Error Drop", value: "-34%" },
            { label: "Validation Loss", value: "-62%" },
            { label: "Target PDE", value: "2D Helmholtz" },
            { label: "Domain", value: "Fourier FFT" }
        ],
        content: `
            <div class="prose prose-invert max-w-none space-y-6 text-sm text-slate-300 leading-relaxed font-sans">
                <div class="bg-cyan-950/30 border border-cyan-500/30 rounded-2xl p-5">
                    <h4 class="text-white font-bold text-base mb-2 font-mono">1. Executive Summary & Scientific Motivation</h4>
                    <p>
                        Forward modeling of acoustic and electromagnetic wave fields governed by the <strong>2D Helmholtz equation</strong> is foundational to ultrasound tomography, seismic inversion, and biomedical imaging. Conventional numerical solvers such as the Finite Difference Method (FDM) and Finite Element Method (FEM) suffer from extreme computational complexity when scaling to high frequencies due to the "pollution effect"—where numerical dispersion accumulates rapidly across the domain.
                    </p>
                </div>

                <div>
                    <h4 class="text-white font-bold text-base mb-2 font-mono">2. The Failure Mode of Standard Localized Convolutions</h4>
                    <p>
                        Standard convolutional neural networks (such as traditional U-Net architectures) rely on localized compact spatial kernels (e.g., 3×3 convolutions). While effective for natural image segmentation, localized kernels exhibit severe inductive bias limitations for wave physics:
                    </p>
                    <ul class="list-disc pl-5 mt-2 space-y-1 text-slate-300">
                        <li><strong>Inability to capture global phase coherence:</strong> Waves propagate across the entire domain; local receptive fields fail to synchronize phase shifts across distant coordinates.</li>
                        <li><strong>High-frequency phase dispersion:</strong> Stacking convolutions leads to phase blurring and smearing of wavefronts.</li>
                    </ul>
                </div>

                <div>
                    <h4 class="text-white font-bold text-base mb-2 font-mono">3. Architectural Innovation: Spectral Convolutions in the Fourier Domain</h4>
                    <p>
                        To resolve this fundamental bottleneck, I designed an <strong>FFT-augmented U-Net (DeepPET)</strong>. By mapping spatial representations into the 2D frequency domain using the Fast Fourier Transform (<code>torch.fft.rfft2</code>), convolutional operations are performed via complex tensor parameter multiplications across lower Fourier modes:
                    </p>
                    <div class="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs my-3 text-cyan-300">
                        R(k) = InverseFFT2D( W(k) · FFT2D(x(r)) )
                    </div>
                    <p>
                        This grants the network an <em>infinite effective receptive field</em> with quasi-linear \(\mathcal{O}(N \log N)\) computational scaling. High-frequency spatial boundary features from standard skip connections are then hybridized with global spectral representations.
                    </p>
                </div>

                <div>
                    <h4 class="text-white font-bold text-base mb-2 font-mono">4. Quantitative Results & TensorBoard Validation</h4>
                    <p>
                        Models were validated across diverse heterogeneous wave-velocity distributions. Physics-aware evaluation metrics tracked in TensorBoard demonstrated:
                    </p>
                    <div class="grid grid-cols-2 gap-3 my-3">
                        <div class="bg-slate-900 p-3 rounded-xl border border-slate-800 text-center">
                            <div class="text-2xl font-bold font-mono text-cyan-400">-34%</div>
                            <div class="text-xs text-slate-400">Mean Relative Reconstruction Error</div>
                        </div>
                        <div class="bg-slate-900 p-3 rounded-xl border border-slate-800 text-center">
                            <div class="text-2xl font-bold font-mono text-emerald-400">-62%</div>
                            <div class="text-xs text-slate-400">Validation Loss Reduction vs Baseline</div>
                        </div>
                    </div>
                    <p>
                        Phase drift was virtually eliminated, validating Fourier layers as an indispensable architectural building block for neural wave-field solvers.
                    </p>
                </div>
            </div>
        `
    },
    'coronary': {
        title: "Automated 3D Coronary Artery Centerline Extraction: SimpleITK & CNN Orientation Tracking",
        author: "Arnav Singhal • Cardiovascular Medical Imaging, Heidelberg University",
        badge: "Medical AI & Image Computing",
        readTime: "5 min read",
        stats: [
            { label: "Centerline Deviation", value: "2.71 mm" },
            { label: "Within 5mm Boundary", value: "100%" },
            { label: "Format", value: "CTA (.mhd)" },
            { label: "Vessel Tensor", value: "M × N × 4" }
        ],
        content: `
            <div class="prose prose-invert max-w-none space-y-6 text-sm text-slate-300 leading-relaxed font-sans">
                <div class="bg-purple-950/30 border border-purple-500/30 rounded-2xl p-5">
                    <h4 class="text-white font-bold text-base mb-2 font-mono">1. Clinical Context & Diagnostic Urgency</h4>
                    <p>
                        Coronary artery disease is the leading cause of global cardiovascular mortality. Computed Tomography Angiography (CTA) enables non-invasive visualization of coronary vessels; however, manual tracing of tortuous, contrast-enhanced arteries across hundreds of 3D slices is labor-intensive and observer-dependent.
                    </p>
                </div>

                <div>
                    <h4 class="text-white font-bold text-base mb-2 font-mono">2. Preprocessing Cardiac CTA Volumes with SimpleITK</h4>
                    <p>
                        Raw cardiac CTA datasets are stored as 3D volumetric images (<code>.mhd / .raw</code> format). The pipeline implemented:
                    </p>
                    <ul class="list-disc pl-5 mt-2 space-y-1 text-slate-300">
                        <li><strong>Isotropic Voxel Resampling:</strong> Standardized anisotropic voxel spacing to uniform 0.5 × 0.5 × 0.5 mm resolution using B-spline interpolation in SimpleITK.</li>
                        <li><strong>Hounsfield Unit (HU) Windowing:</strong> Clamped attenuation values between 0 and 800 HU to maximize contrast separation between coronary lumen, calcified plaques, and myocardium.</li>
                    </ul>
                </div>

                <div>
                    <h4 class="text-white font-bold text-base mb-2 font-mono">3. Directional CNN Orientation Tracking & Spline Fitting</h4>
                    <p>
                        Rather than performing memory-intensive 3D semantic segmentation on full volumes, a specialized <strong>convolutional orientation tracker</strong> predicted local 3D directional vectors \(\mathbf{v} \in \mathbb{R}^3\) along the vessel path, dynamically stepping through the arterial tree.
                    </p>
                    <p class="mt-2">
                        Extracted coordinates were transformed into structured <code>M × N × 4</code> tensor geometry representing spatial 3D coordinates plus local vessel diameter radius.
                    </p>
                </div>

                <div>
                    <h4 class="text-white font-bold text-base mb-2 font-mono">4. Benchmark Deviation & Stenosis Simulation</h4>
                    <p>
                        Rigorous evaluation against clinical ground-truth expert annotations confirmed:
                    </p>
                    <ul class="list-disc pl-5 mt-2 space-y-1 text-slate-300">
                        <li><strong>Mean centerline deviation of 2.71 mm</strong>, with <strong>100% of tracked points</strong> falling within the clinically acceptable 5 mm tolerance limit.</li>
                        <li>Successfully simulated hemodynamic stenosis models to detect pathological luminal narrowing exceeding 50% diameter reduction.</li>
                    </ul>
                </div>
            </div>
        `
    },
    'bcos': {
        title: "Explainable AI for Clinical Decision Support: Intrinsically Interpretable B-Cos Networks",
        author: "Arnav Singhal • Deep Learning & Computer Vision, Heidelberg University",
        badge: "Explainable AI (XAI)",
        readTime: "5 min read",
        stats: [
            { label: "Images Evaluated", value: "35,887" },
            { label: "Accuracy Penalty", value: "0.0%" },
            { label: "Model Type", value: "B-Cos Conv" },
            { label: "Interpretability", value: "Intrinsic" }
        ],
        content: `
            <div class="prose prose-invert max-w-none space-y-6 text-sm text-slate-300 leading-relaxed font-sans">
                <div class="bg-emerald-950/30 border border-emerald-500/30 rounded-2xl p-5">
                    <h4 class="text-white font-bold text-base mb-2 font-mono">1. The Post-Hoc Saliency Dilemma in Healthcare AI</h4>
                    <p>
                        High accuracy without explainability creates severe liability in healthcare. While methods like Grad-CAM and Integrated Gradients are widely used, they are <em>post-hoc approximations</em> that frequently generate diffuse, unfaithful heatmaps that highlight background noise rather than genuine diagnostic features.
                    </p>
                </div>

                <div>
                    <h4 class="text-white font-bold text-base mb-2 font-mono">2. Mathematical Formulation of B-Cos Convolutions</h4>
                    <p>
                        Standard convolutions compute an unconstrained dot product \(\mathbf{w}^\top \mathbf{x}\). A large output can occur even with arbitrary misalignment if input magnitude is high. B-cos convolutions replace the linear inner product with cosine angle alignment:
                    </p>
                    <div class="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs my-3 text-cyan-300">
                        Bcos(x; w) = ||x|| · |cos(∠(w, x))|^B · sgn(cos(∠(w, x)))
                    </div>
                    <p>
                        This forces convolutional filters to activate <em>only</em> when the input aligns directionally with learned feature templates, providing natural, intrinsic transparency.
                    </p>
                </div>

                <div>
                    <h4 class="text-white font-bold text-base mb-2 font-mono">3. Benchmark on FER2013: Parity Without Accuracy Loss</h4>
                    <p>
                        Trained both standard and B-cos CNN architectures under strictly identical training parameters (SGD with momentum, cosine LR decay, horizontal flip augmentations) on FER2013 (28,709 train, 7,178 test images).
                    </p>
                    <p class="mt-2">
                        <strong>Result:</strong> B-cos CNN achieved parity with the baseline classification accuracy (66.4% vs 66.2%), while producing sharp, focused heatmaps centered cleanly on medically salient facial landmarks (eyes, eyebrow curvature, and zygomatic mouth corners) rather than diffuse cheek or background pixels.
                    </p>
                </div>
            </div>
        `
    }
};

// Video Walkthroughs Data
const VIDEO_WALKTHROUGHS_DATA = {
    'deeppet': {
        title: "DeepPET Fourier U-Net: 2D Wave-field Forward Modelling",
        duration: "1:25 min",
        speaker: "Arnav Singhal • Lead Researcher",
        chapters: [
            { time: "0:00", label: "The 2D Helmholtz Wave Equation & Numerical Limits" },
            { time: "0:25", label: "Fourier Spectral Convolutions Architecture" },
            { time: "0:55", label: "Quantitative Evaluation: -34% Error & -62% Loss" },
            { time: "1:15", label: "TensorBoard Physics-Aware Validation" }
        ],
        embedPlaceholder: "DeepPET Wave-field Reconstruction Walkthrough"
    },
    'coronary': {
        title: "3D Coronary Artery Centerline Extraction from CTA",
        duration: "1:10 min",
        speaker: "Arnav Singhal • Medical AI Engineer",
        chapters: [
            { time: "0:00", label: "Cardiac CTA .mhd Preprocessing with SimpleITK" },
            { time: "0:20", label: "Directional CNN Orientation Tracking Engine" },
            { time: "0:45", label: "3D Vessel Reconstruction (2.71mm Deviation)" },
            { time: "1:00", label: "Diagnostic Hemodynamic Stenosis Modeling" }
        ],
        embedPlaceholder: "Cardiac CTA 3D Centerline Tracking Walkthrough"
    },
    'pubmedqa': {
        title: "PubMedQA: Semantic Vector Retrieval & DistilBERT QA",
        duration: "1:15 min",
        speaker: "Arnav Singhal • NLP & Biomedical AI",
        chapters: [
            { time: "0:00", label: "Architecture: txtai & PubMedBERT Vector Index" },
            { time: "0:25", label: "Semantic Vector Search vs Keyword Limitations" },
            { time: "0:50", label: "DistilBERT QA Answer Extraction in Streamlit" },
            { time: "1:05", label: "Containerized Docker Microservice Deployment" }
        ],
        embedPlaceholder: "PubMedQA Biomedical NLP Walkthrough"
    }
};

// Case Study Article Modal Handler
function initArticleModal() {
    const modal = document.getElementById('article-modal');
    const modalContent = document.getElementById('article-dynamic-content');
    const closeBtn = document.getElementById('article-close-btn');
    const openBtns = document.querySelectorAll('.open-article-modal');

    if (!modal || !modalContent) return;

    function openArticle(articleId) {
        const data = CASE_STUDIES_DATA[articleId];
        if (!data) return;

        modalContent.innerHTML = `
            <div class="space-y-6">
                <!-- Header -->
                <div class="border-b border-slate-800 pb-5">
                    <div class="flex flex-wrap items-center gap-2 mb-2">
                        <span class="px-2.5 py-0.5 text-xs font-mono rounded bg-cyan-950/70 text-cyan-300 border border-cyan-500/30">${data.badge}</span>
                        <span class="text-xs font-mono text-slate-400">•</span>
                        <span class="text-xs font-mono text-slate-400">${data.readTime}</span>
                    </div>
                    <h3 class="text-2xl sm:text-3xl font-extrabold text-white mb-2 leading-tight">${data.title}</h3>
                    <p class="text-xs font-mono text-cyan-400">${data.author}</p>
                </div>

                <!-- Metrics Bar -->
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                    ${data.stats.map(s => `
                        <div class="text-center">
                            <div class="text-xl font-bold text-cyan-300 font-mono">${s.value}</div>
                            <div class="text-xs text-slate-400">${s.label}</div>
                        </div>
                    `).join('')}
                </div>

                <!-- Main Content Body -->
                <div>
                    ${data.content}
                </div>
            </div>
        `;

        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    function closeArticle() {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }

    openBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const id = btn.getAttribute('data-article');
            openArticle(id);
        });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeArticle);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeArticle(); });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeArticle();
    });
}

// Video Walkthrough Modal Handler
function initVideoModal() {
    const modal = document.getElementById('video-modal');
    const modalContent = document.getElementById('video-dynamic-content');
    const closeBtn = document.getElementById('video-close-btn');
    const openBtns = document.querySelectorAll('.open-video-modal');

    if (!modal || !modalContent) return;

    function openVideo(videoId) {
        const data = VIDEO_WALKTHROUGHS_DATA[videoId];
        if (!data) return;

        modalContent.innerHTML = `
            <div class="space-y-6">
                <!-- Header -->
                <div class="border-b border-slate-800 pb-4">
                    <div class="flex items-center gap-2 mb-1">
                        <span class="px-2 py-0.5 text-xs font-mono rounded bg-red-950/60 text-red-300 border border-red-500/30 flex items-center gap-1">
                            <span class="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse"></span>
                            <span>Video Walkthrough</span>
                        </span>
                        <span class="text-xs font-mono text-slate-400">${data.duration}</span>
                    </div>
                    <h3 class="text-xl sm:text-2xl font-bold text-white mb-1">${data.title}</h3>
                    <p class="text-xs font-mono text-slate-400">${data.speaker}</p>
                </div>

                <!-- Video Player Container / Loom Embed Surface -->
                <div class="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-cyan-500/30 flex flex-col items-center justify-center p-6 text-center group shadow-2xl">
                    <div class="w-16 h-16 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/40 mb-3 group-hover:scale-110 transition shadow-lg shadow-cyan-500/20">
                        <svg class="w-8 h-8 fill-current ml-1" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                    </div>
                    <h4 class="text-base font-bold text-white mb-1">${data.embedPlaceholder}</h4>
                    <p class="text-xs text-slate-400 max-w-md">
                        Ready to play! You can paste your recorded Loom or YouTube embed URL directly into <code>VIDEO_WALKTHROUGHS_DATA</code> in <code>main.js</code> anytime.
                    </p>
                    <div class="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-slate-500 border-t border-slate-900 pt-2">
                        <span>Status: Loom Embed Ready</span>
                        <span>Auto-HD 1080p</span>
                    </div>
                </div>

                <!-- Video Chapters & Key Takeaways -->
                <div>
                    <h4 class="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">Video Chapters & Agenda</h4>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        ${data.chapters.map(c => `
                            <div class="flex items-center gap-2 p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs">
                                <span class="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-400 font-mono font-bold">${c.time}</span>
                                <span class="text-slate-300">${c.label}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    function closeVideo() {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }

    openBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const id = btn.getAttribute('data-video');
            openVideo(id);
        });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeVideo);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeVideo(); });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeVideo();
    });
}

// Active Nav link tracking
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('text-cyan-400');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('text-cyan-400');
            }
        });
    });
}

// Launch
window.addEventListener('DOMContentLoaded', () => {
    initProjectFilters();
    initProjectModal();
    initCopyHelpers();
    initMobileMenu();
    initCounterObserver();
    initScrollSpy();
    initArticleModal();
    initVideoModal();
});

