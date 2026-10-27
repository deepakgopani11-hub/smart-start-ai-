# Test script to verify SmartStart AI website requirements
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "Running SmartStart AI Verification Tests" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

$html = Get-Content -Raw "index.html"
$css  = Get-Content -Raw "styles.css"
$js   = Get-Content -Raw "script.js"

$tests = @(
  @{ Name = "1. index.html file exists"; Pass = (Test-Path "index.html") },
  @{ Name = "2. styles.css file exists"; Pass = (Test-Path "styles.css") },
  @{ Name = "3. script.js file exists"; Pass = (Test-Path "script.js") },
  @{ Name = "4. Semantic HTML5 tags (header, main, section, footer)"; Pass = ($html.Contains("<header") -and $html.Contains("<main>") -and $html.Contains("<section") -and $html.Contains("<footer")) },
  @{ Name = "5. Business heading explaining value proposition"; Pass = ($html.Contains("Supercharge Your Business With") -and $html.Contains("Simple, Practical AI")) },
  @{ Name = "6. Three service cards present"; Pass = ([regex]::Matches($html, 'class="service-card').Count -eq 3) },
  @{ Name = "7. Service 1: AI Workflow Automation"; Pass = ($html.Contains("AI Workflow Automation")) },
  @{ Name = "8. Service 2: Smart Customer Chatbots"; Pass = ($html.Contains("Smart Customer Chatbots")) },
  @{ Name = "9. Service 3: AI Content & Marketing"; Pass = ($html.Contains("AI Content & Marketing")) },
  @{ Name = "10. Contact section with sample email"; Pass = ($html.Contains("hello@smartstartai.example.com")) },
  @{ Name = "11. Responsive CSS Grid & Flexbox implemented"; Pass = ($css.Contains("display: grid") -and $css.Contains("display: flex")) },
  @{ Name = "12. Mobile responsive media queries present"; Pass = ($css.Contains("@media (max-width: 768px)")) },
  @{ Name = "13. JavaScript handles mobile menu toggle"; Pass = ($js.Contains("menu-toggle") -and $js.Contains("classList.toggle")) },
  @{ Name = "14. JavaScript handles form submit & user feedback"; Pass = ($js.Contains("contact-form") -and $js.Contains("feedbackBox")) },
  @{ Name = "15. Chatbot widget markup in bottom-right corner"; Pass = ($html.Contains("id=`"chatbot-launcher`"") -and $html.Contains("id=`"chatbot-window`"")) },
  @{ Name = "16. Chatbot CSS fixed styling & animations"; Pass = ($css.Contains(".chatbot-widget") -and $css.Contains("position: fixed") -and $css.Contains("right: 24px")) },
  @{ Name = "17. Chatbot JS toggle & input handling"; Pass = ($js.Contains("chatbotLauncher") -and $js.Contains("toggleChatbot")) },
  @{ Name = "18. Chatbot AI knowledge response engine"; Pass = ($js.Contains("getBotResponse") -and $js.Contains("showTypingIndicator")) }
)

$passedCount = 0
foreach ($test in $tests) {
  if ($test.Pass) {
    Write-Host "[PASS] $($test.Name)" -ForegroundColor Green
    $passedCount++
  } else {
    Write-Host "[FAIL] $($test.Name)" -ForegroundColor Red
  }
}

$statusColor = "Green"
if ($passedCount -ne $tests.Count) { $statusColor = "Yellow" }
Write-Host "------------------------------------------" -ForegroundColor Cyan
Write-Host "Summary: $passedCount of $($tests.Count) tests passed!" -ForegroundColor $statusColor

