import React, { useState } from "react"
import { Download, Loader } from "lucide-react"

const PDFExportButton = () => {
    const [isGenerating, setIsGenerating] = useState(false)
    const [progress, setProgress] = useState(0)

    const handlePDFExport = async () => {
        // Dynamic imports to avoid SSR issues if using Next.js
        const html2canvas = (await import('html2canvas')).default
        const jsPDF = (await import('jspdf')).default

        setIsGenerating(true)
        setProgress(10)

        try {
            // Get the whitepaper element
            const element = document.querySelector('.whitepaper-page')

            if (!element) {
                console.error('Whitepaper element not found')
                setIsGenerating(false)
                return
            }

            // Clone the element to avoid modifying the original
            const clonedElement = element.cloneNode(true)

            // Remove elements that shouldn't be in PDF
            const elementsToRemove = clonedElement.querySelectorAll('.wp-pdf-export, .wp-scroll-hint')
            elementsToRemove.forEach(el => el.remove())

            // Store original scroll position
            const originalScrollPos = window.scrollY
            window.scrollTo(0, 0)

            setProgress(20)

            // Configure html2canvas options with better error handling
            const canvas = await html2canvas(element, {
                scale: 1.5, // Reduced scale to avoid memory issues
                useCORS: true,
                logging: true, // Enable logging for debugging
                allowTaint: true, // Allow tainted canvas for local images
                backgroundColor: '#0a0b0f',
                windowWidth: 1200, // Fixed width for consistency
                windowHeight: element.scrollHeight,
                imageTimeout: 15000, // 15 second timeout for images
                onclone: (clonedDoc) => {
                    // Ensure all styles are applied
                    const clonedEl = clonedDoc.querySelector('.whitepaper-page')
                    if (clonedEl) {
                        clonedEl.style.transform = 'none'
                        clonedEl.style.position = 'relative'

                        // Fix any chart issues
                        const charts = clonedEl.querySelectorAll('.recharts-wrapper')
                        charts.forEach(chart => {
                            chart.style.visibility = 'visible'
                            chart.style.opacity = '1'
                        })
                    }
                }
            })

            setProgress(50)

            // Check if canvas is valid
            if (!canvas || canvas.width === 0 || canvas.height === 0) {
                throw new Error('Invalid canvas generated')
            }

            // Get image data and validate
            const imgData = canvas.toDataURL('image/jpeg', 0.95) // Using JPEG for better compatibility

            // Validate image data
            if (!imgData || !imgData.startsWith('data:image')) {
                throw new Error('Invalid image data generated')
            }

            setProgress(70)

            // PDF dimensions in mm
            const pdfWidth = 210 // A4 width
            const pdfHeight = 297 // A4 height

            // Calculate dimensions
            const imgWidth = pdfWidth
            const imgHeight = (canvas.height * pdfWidth) / canvas.width

            // Create PDF with specific settings
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4',
                compress: true
            })

            setProgress(80)

            // Add pages
            let heightLeft = imgHeight
            let position = 0
            let pageNumber = 0

            while (heightLeft > 0) {
                if (pageNumber > 0) {
                    pdf.addPage()
                }

                // Add image to current page
                pdf.addImage(
                    imgData,
                    'JPEG', // Changed from PNG to JPEG
                    0,
                    position,
                    imgWidth,
                    Math.min(imgHeight, pdfHeight),
                    undefined,
                    'FAST'
                )

                heightLeft -= pdfHeight
                position -= pdfHeight
                pageNumber++

                // Prevent infinite loop
                if (pageNumber > 50) {
                    console.warn('Too many pages, stopping at 50')
                    break
                }
            }

            setProgress(90)

            // Add metadata
            pdf.setProperties({
                title: 'MetaMemeVault Whitepaper',
                subject: 'The Revolution of Meme-to-Earn',
                author: 'MetaMemeVault Team',
                keywords: 'MMV, cryptocurrency, memecoins, whitepaper',
                creator: 'MetaMemeVault'
            })

            // Save the PDF
            pdf.save('MetaMemeVault-Whitepaper-v2.0.pdf')

            setProgress(100)

            // Restore scroll position
            window.scrollTo(0, originalScrollPos)

            // Reset after success
            setTimeout(() => {
                setIsGenerating(false)
                setProgress(0)
            }, 500)

        } catch (error) {
            console.error('Error generating PDF:', error)

            // Provide more specific error messages
            let errorMessage = 'Failed to generate PDF. '
            if (error.message.includes('PNG')) {
                errorMessage += 'Image processing error. Please try the Quick Print option instead.'
            } else if (error.message.includes('canvas')) {
                errorMessage += 'Rendering error. Please try again or use Quick Print.'
            } else {
                errorMessage += error.message || 'Please try again.'
            }

            alert(errorMessage)
            setIsGenerating(false)
            setProgress(0)
        }
    }

    // Alternative method with better compatibility
    const handleSimplePDFExport = async () => {
        setIsGenerating(true)

        try {
            const jsPDF = (await import('jspdf')).default
            const html2canvas = (await import('html2canvas')).default

            const element = document.querySelector('.whitepaper-page')
            if (!element) return

            // Simple approach - capture visible area only
            const canvas = await html2canvas(element, {
                scale: 1,
                logging: false,
                useCORS: true,
                backgroundColor: '#0a0b0f'
            })

            const pdf = new jsPDF('p', 'mm', 'a4')
            const imgData = canvas.toDataURL('image/jpeg', 0.9)

            pdf.addImage(imgData, 'JPEG', 10, 10, 190, 0)
            pdf.save('MetaMemeVault-Whitepaper-Quick.pdf')

        } catch (error) {
            console.error('Simple export failed:', error)
            alert('PDF export failed. Please use your browser\'s print function (Ctrl+P / Cmd+P)')
        } finally {
            setIsGenerating(false)
        }
    }

    // Browser print with preserved styles
    const handleStyledPrint = () => {
        const styleElement = document.createElement('style')
        styleElement.id = 'custom-print-styles'
        styleElement.innerHTML = `
               @media print {
                   * {
                       -webkit-print-color-adjust: exact !important;
                       print-color-adjust: exact !important;
                       color-adjust: exact !important;
                   }
                   
                   body, .whitepaper-page {
                       background: #0a0b0f !important;
                       color: #b8bcc8 !important;
                   }
                   
                   .wp-section-title {
                       color: #ffffff !important;
                   }
                   
                   .wp-bg-card {
                       background: #1a1c24 !important;
                   }
                   
                   .wp-primary {
                       color: #4b5ae4 !important;
                   }
                   
                   .wp-pdf-export {
                       display: none !important;
                   }
                   
                   section {
                       page-break-inside: avoid;
                   }
                   
                   h2, h3 {
                       page-break-after: avoid;
                   }
               }
           `

        document.head.appendChild(styleElement)
        window.print()

        setTimeout(() => {
            const style = document.getElementById('custom-print-styles')
            if (style) document.head.removeChild(style)
        }, 1000) 
    }

    return (
        <>
            <div className="wp-pdf-export">
                {/* Main PDF Export Button */}
                <button
                    className={`wp-pdf-button ${isGenerating ? 'wp-pdf-generating' : ''}`}
                    onClick={handlePDFExport}
                    disabled={isGenerating}
                    title="Download Full PDF"
                >
                    {isGenerating ? (
                        <>
                            <Loader size={20} className="wp-pdf-spinner" />
                            <span>{progress > 0 ? `${progress}%` : 'Loading...'}</span>
                        </>
                    ) : (
                        <>
                            <Download size={20} />
                            <span>Download PDF</span>
                        </>
                    )}
                </button>

                {/* Quick Export Option */}
                <button
                    className="wp-pdf-button wp-pdf-alt"
                    onClick={handleSimplePDFExport}
                    disabled={isGenerating}
                    title="Quick Export (First Page)"
                >
                    <Download size={20} />
                    <span>Quick Export</span>
                </button>

                {/* Print Option */}
                <button
                    className="wp-pdf-button wp-pdf-alt"
                    onClick={handleStyledPrint}
                    title="Print with Dark Theme"
                >
                    <Download size={20} />
                    <span>Print (Ctrl+P)</span>
                </button>
            </div>

            {/* Progress Bar Overlay */}
            {isGenerating && progress > 0 && (
                <div className="wp-pdf-overlay">
                    <div className="wp-pdf-progress-container">
                        <div className="wp-pdf-progress-bar" style={{ width: `${progress}%` }} />
                        <p className="wp-pdf-progress-text">
                            Generating PDF... {progress}%
                        </p>
                        <p style={{ fontSize: '0.85rem', marginTop: '10px', opacity: 0.7 }}>
                            This may take a moment for long documents
                        </p>
                    </div>
                </div>
            )}
        </>
    )
}

export default PDFExportButton