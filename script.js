const quotes = { happy: [], chill: [], tired: [], stressed: [] };

const modal = document.getElementById('quote-modal');
const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const closeButton = document.getElementsByClassName('close-button')[0];
const errorContainer = document.querySelector('.error-container');

const typewriterTextElement = document.querySelector('.typewriter-text h4');
const typewriterAuthorElement = document.querySelector('.typewriter-text .author');
const philosophyQuotes = [
    { quote: "Know thyself.", author: "- Socrates" },
    { quote: "Whatever can happen, will happen.", author: "- Murphy's law" },
    { quote: "Do every act of your life as if it were your last.", author: "- Marcus Aurelius" }
];
let currentQuoteIndex = 0;

async function fetchQuotes() {
    try {
        await Promise.all([
            fetchQuotesByMood('happy'),
            fetchQuotesByMood('chill'),
            fetchQuotesByMood('tired'),
            fetchQuotesByMood('stressed')
        ]);
    } catch (error) {
        showErrorMessage('Error fetching quotes. Please try again later.');
        console.error('Error fetching quotes:', error);
    }
}

async function fetchQuotesByMood(mood) {
    try {
        const response = await fetch(`quotes/${mood}.json`);
        const data = await response.json();
        quotes[mood] = data;
    } catch (error) {
        showErrorMessage(`Error fetching ${mood} quotes. Please try again later.`);
        console.error(`Error fetching ${mood} quotes:`, error);
    }
}

function displayQuote(mood) {
    const today = new Date().toDateString();
    const completedMoods = JSON.parse(localStorage.getItem('completedMoods')) || {};

    if (completedMoods[mood] === today) {
        const quoteIndex = completedMoods[`${mood}Index`];
        const quote = quotes[mood][quoteIndex];
        quoteText.textContent = quote.quote;
        quoteAuthor.textContent = `- ${quote.author}`;
    } else {
        const randomIndex = Math.floor(Math.random() * quotes[mood].length);
        const quote = quotes[mood][randomIndex];
        quoteText.textContent = quote.quote;
        quoteAuthor.textContent = `- ${quote.author}`;
        completedMoods[mood] = today;
        completedMoods[`${mood}Index`] = randomIndex;
        localStorage.setItem('completedMoods', JSON.stringify(completedMoods));
    }

    modal.style.display = 'block';
    document.body.classList.add('modal-open');
    document.body.style.overflow = 'hidden';
}

function typeWriter(text, author) {
    let i = 0;
    typewriterTextElement.textContent = '';
    typewriterAuthorElement.textContent = '';

    function type() {
        if (i < text.length) {
            typewriterTextElement.textContent += text.charAt(i);
            i++;
            setTimeout(type, 100);
        } else {
            setTimeout(() => {
                let authorIndex = 0;

                function typeAuthor() {
                    if (authorIndex < author.length) {
                        typewriterAuthorElement.textContent += author.charAt(authorIndex);
                        authorIndex++;
                        setTimeout(typeAuthor, 100);
                    } else {
                        setTimeout(nextQuote, 3000);
                    }
                }
                typeAuthor();
            }, 500);
        }
    }
    type();
}

function nextQuote() {
    currentQuoteIndex = (currentQuoteIndex + 1) % philosophyQuotes.length;
    typeWriter(philosophyQuotes[currentQuoteIndex].quote, philosophyQuotes[currentQuoteIndex].author);
}

function hideQuote() {
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
    document.body.style.overflow = '';
}

function showErrorMessage(message) {
    errorContainer.textContent = message;
}

document.querySelectorAll('.mood-card').forEach(card => {
    card.addEventListener('click', () => {
        const mood = card.getAttribute('data-mood');
        displayQuote(mood);
    });
});

// closeButton.addEventListener('click', hideQuote); // Remove or comment out this line

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        hideQuote();
    }
});

fetchQuotes();
typeWriter(philosophyQuotes[0].quote, philosophyQuotes[0].author);

const downloadButton = document.querySelector('.download-options button');
const quoteContainer = document.querySelector('.quote-container');

downloadButton.addEventListener('click', () => {
    const ratio = downloadButton.getAttribute('data-ratio').split(':');
    const width = 650;
    const height = (width * ratio[1]) / ratio[0];

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    const padding = 48;

    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--eclipse-0');
    ctx.fillRect(0, 0, width, height);

    const img = new Image();
    img.src = 'assets/quote.svg';
    img.onload = () => {
        ctx.drawImage(img, padding, padding, 50, 43.41);

        ctx.font = `400 ${parseInt(getComputedStyle(document.documentElement).getPropertyValue('--font-size-displayMedium')) * (width / 500)}px ${getComputedStyle(document.documentElement).getPropertyValue('--primary').replace(/['"]+/g, '')}`;
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--eclipse-11');
        ctx.textAlign = 'left';
        const quoteTextHeight = wrapText(ctx, quoteText.textContent, padding, padding * 3 + 30, width - padding * 2, parseInt(getComputedStyle(document.documentElement).getPropertyValue('--font-size-displayMedium')) * 1.3 * (width / 500));

        ctx.font = `400 ${parseInt(getComputedStyle(document.documentElement).getPropertyValue('--font-size-heading5')) * (width / 500)}px ${getComputedStyle(document.documentElement).getPropertyValue('--secondary').replace(/['"]+/g, '')}`;
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--eclipse-8');
        ctx.textAlign = 'left';
        wrapText(ctx, quoteAuthor.textContent, padding, height - padding - 30, width - padding * 2, parseInt(getComputedStyle(document.documentElement).getPropertyValue('--font-size-heading5')) * 1.4 * (width / 500));

        const link = document.createElement('a');
        link.download = 'quote.png';
        link.href = canvas.toDataURL();
        link.click();
    };
});


function wrapText(context, text, x, y, maxWidth, lineHeight) {
    let words = text.split(' ');
    let line = '';
    let totalHeight = 0;
    for (let n = 0; n < words.length; n++) {
        let testLine = line + words[n] + ' ';
        let metrics = context.measureText(testLine);
        let testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
            context.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
            totalHeight += lineHeight;
        } else {
            line = testLine;
        }
    }
    context.fillText(line, x, y);
    totalHeight += lineHeight;

    return totalHeight;
}