# Oregon Cost Inputs (Internal Reference)

Last updated: 2026-02-02

## Regional Price Parities (RPP) - 2023 (US=100)

- Oregon (statewide): 104.721
- Oregon metro portion: 105.586
- Oregon nonmetro portion: 99.524
- Portland-Vancouver-Hillsboro, OR-WA MSA: 106.615
- Salem, OR MSA: 102.410
- Albany, OR MSA: 104.609

## Cost Factor Mapping (ZIP-based)

- Harney County: 97720, 97738 -> OR nonmetro (0.995)
- Portland metro (Clackamas/Marion edge): 97013, 97026, 97032, 97038, 97045, 97071 -> Portland MSA (1.066)
- Salem MSA: 97301-97317, 97303, 97325, 97338, 97344, 97347, 97351, 97361, 97362, 97371, 97375, 97378, 97381, 97383, 97385, 97392, 97396 -> Salem MSA (1.024)
- Albany-Lebanon MSA: 97327, 97335, 97336, 97342, 97346, 97348, 97352, 97355, 97358, 97360, 97374, 97377, 97386, 97389 -> Albany MSA (1.046)
- Oregon metro portion fallback (McMinnville/Eugene/Corvallis): 97101, 97111, 97114, 97115, 97128, 97132, 97148, 97330-97339, 97446, 97489 -> OR metro (1.056)

## Base Cost Ranges Used in Modules (Before RPP)

- Residential maintenance: $1.00–$2.50 per sq ft per year (age-adjusted)
- Commercial maintenance: $2.50–$7.50 per sq ft per year (age-adjusted)
- Commercial roof replacement:
  - TPO/EPDM: $6–$10 per sq ft
  - Asphalt: $3–$6 per sq ft
  - Metal: $5–$12 per sq ft
  - Tile/Slate: $10–$20 per sq ft
- Commercial HVAC replacement: $5,500–$25,000 per unit

Sources:

- BEA RPP (state/metro/nonmetro) via FRED series for 2023 values.
