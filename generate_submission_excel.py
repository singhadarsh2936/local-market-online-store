import zipfile
import os

def create_excel(output_path):
    # Prepare XML strings
    content_types = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
  <Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
  <Override PartName="/xl/worksheets/sheet2.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
  <Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>
</Types>"""

    root_rels = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
</Relationships>"""

    wb_rels = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet2.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>"""

    workbook = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <sheets>
    <sheet name="CA1_Project_Submission" sheetId="1" r:id="rId1"/>
    <sheet name="Project_Details_&amp;_Viva" sheetId="2" r:id="rId2"/>
  </sheets>
</workbook>"""

    styles = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <fonts count="6">
    <!-- 0: Default -->
    <font><sz val="11"/><name val="Calibri"/></font>
    <!-- 1: Header bold white -->
    <font><b/><sz val="11"/><color rgb="FFFFFFFF"/><name val="Calibri"/></font>
    <!-- 2: Big Title bold navy -->
    <font><b/><sz val="14"/><color rgb="FF0F3C64"/><name val="Calibri"/></font>
    <!-- 3: Subtitle / italic note -->
    <font><i/><sz val="10"/><color rgb="FF555555"/><name val="Calibri"/></font>
    <!-- 4: Bold data text -->
    <font><b/><sz val="11"/><color rgb="FF1F2937"/><name val="Calibri"/></font>
    <!-- 5: Hyperlink blue underline -->
    <font><u/><sz val="11"/><color rgb="FF1D4ED8"/><name val="Calibri"/></font>
  </fonts>
  <fills count="5">
    <fill><patternFill patternType="none"/></fill>
    <fill><patternFill patternType="gray125"/></fill>
    <!-- 2: Primary Navy Header #0F3C64 -->
    <fill><patternFill patternType="solid"><fgColor rgb="FF0F3C64"/></patternFill></fill>
    <!-- 3: Light Blue Zebra Row #F0F7FF -->
    <fill><patternFill patternType="solid"><fgColor rgb="FFF0F7FF"/></patternFill></fill>
    <!-- 4: Accent Orange/Gold Subheader #D97706 -->
    <fill><patternFill patternType="solid"><fgColor rgb="FFD97706"/></patternFill></fill>
  </fills>
  <borders count="2">
    <border><left/><right/><top/><bottom/></border>
    <!-- 1: Thin light gray border -->
    <border>
      <left style="thin"><color rgb="FFD1D5DB"/></left>
      <right style="thin"><color rgb="FFD1D5DB"/></right>
      <top style="thin"><color rgb="FFD1D5DB"/></top>
      <bottom style="thin"><color rgb="FFD1D5DB"/></bottom>
    </border>
  </borders>
  <cellStyleXfs count="1">
    <xf numFmtId="0" fontId="0" fillId="0" borderId="0"/>
  </cellStyleXfs>
  <cellXfs count="8">
    <!-- 0: Default -->
    <xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>
    <!-- 1: Header Navy Cell -->
    <xf numFmtId="0" fontId="1" fillId="2" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1">
      <alignment horizontal="center" vertical="center" wrapText="1"/>
    </xf>
    <!-- 2: Title Cell -->
    <xf numFmtId="0" fontId="2" fillId="0" borderId="0" xfId="0" applyFont="1" applyAlignment="1">
      <alignment horizontal="left" vertical="center"/>
    </xf>
    <!-- 3: Subtitle / instruction note -->
    <xf numFmtId="0" fontId="3" fillId="0" borderId="0" xfId="0" applyFont="1" applyAlignment="1">
      <alignment horizontal="left" vertical="center" wrapText="1"/>
    </xf>
    <!-- 4: Standard bordered data cell -->
    <xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0" applyFont="1" applyBorder="1" applyAlignment="1">
      <alignment horizontal="left" vertical="center" wrapText="1"/>
    </xf>
    <!-- 5: Zebra bordered data cell -->
    <xf numFmtId="0" fontId="0" fillId="3" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1">
      <alignment horizontal="left" vertical="center" wrapText="1"/>
    </xf>
    <!-- 6: Centered bordered data cell -->
    <xf numFmtId="0" fontId="4" fillId="0" borderId="1" xfId="0" applyFont="1" applyBorder="1" applyAlignment="1">
      <alignment horizontal="center" vertical="center"/>
    </xf>
    <!-- 7: Hyperlink bordered cell -->
    <xf numFmtId="0" fontId="5" fillId="0" borderId="1" xfId="0" applyFont="1" applyBorder="1" applyAlignment="1">
      <alignment horizontal="left" vertical="center" wrapText="1"/>
    </xf>
  </cellXfs>
</styleSheet>"""

    # Sheet 1: Exact format specified in LPU Instruction PDF (Section 4)
    sheet1 = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <cols>
    <col min="1" max="1" width="38" customWidth="1"/>
    <col min="2" max="2" width="22" customWidth="1"/>
    <col min="3" max="3" width="16" customWidth="1"/>
    <col min="4" max="4" width="30" customWidth="1"/>
    <col min="5" max="5" width="45" customWidth="1"/>
    <col min="6" max="6" width="45" customWidth="1"/>
    <col min="7" max="7" width="35" customWidth="1"/>
  </cols>
  <sheetData>
    <!-- Title and University Header -->
    <row r="1" ht="28" customHeight="1">
      <c r="A1" t="inlineStr" s="2"><is><t>LOVELY PROFESSIONAL UNIVERSITY — CSE326 CA1 ASSESSMENT</t></is></c>
    </row>
    <row r="2" ht="20" customHeight="1">
      <c r="A2" t="inlineStr" s="3"><is><t>Official Submission File for Problem Statement–Based Project (Upload this file on UMS)</t></is></c>
    </row>
    <row r="3" ht="10" customHeight="1"></row>

    <!-- Official Format Required by Page 3 of Instruction PDF -->
    <row r="4" ht="36" customHeight="1">
      <c r="A4" t="inlineStr" s="1"><is><t>Project Name &amp; Title</t></is></c>
      <c r="B4" t="inlineStr" s="1"><is><t>Team Name</t></is></c>
      <c r="C4" t="inlineStr" s="1"><is><t>Course Code</t></is></c>
      <c r="D4" t="inlineStr" s="1"><is><t>Registration Number(s)</t></is></c>
      <c r="E4" t="inlineStr" s="1"><is><t>GitHub Link</t></is></c>
      <c r="F4" t="inlineStr" s="1"><is><t>Deployed Link</t></is></c>
      <c r="G4" t="inlineStr" s="1"><is><t>Video Presentation Link</t></is></c>
    </row>

    <!-- Submission Data Row -->
    <row r="5" ht="42" customHeight="1">
      <c r="A5" t="inlineStr" s="4"><is><t>Local Market Online Store for Small Vendors (TownSquare)</t></is></c>
      <c r="B5" t="inlineStr" s="4"><is><t>Team TownSquare</t></is></c>
      <c r="C5" t="inlineStr" s="6"><is><t>CSE326</t></is></c>
      <c r="D5" t="inlineStr" s="4"><is><t>[Enter Registration Number(s) of All Team Members]</t></is></c>
      <c r="E5" t="inlineStr" s="7"><is><t>https://github.com/singhadarsh2936/local-market-online-store</t></is></c>
      <c r="F5" t="inlineStr" s="7"><is><t>https://singhadarsh2936.github.io/local-market-online-store/</t></is></c>
      <c r="G5" t="inlineStr" s="4"><is><t>[Paste Your Video Presentation URL Here]</t></is></c>
    </row>

    <row r="6" ht="15" customHeight="1"></row>

    <!-- Instructions / Rubric Overview Box -->
    <row r="7" ht="22" customHeight="1">
      <c r="A7" t="inlineStr" s="4"><is><t>Submission Checklist &amp; Evaluation Rubrics (Total 30 Marks):</t></is></c>
    </row>
    <row r="8" ht="20" customHeight="1">
      <c r="A8" t="inlineStr" s="5"><is><t>1. Functionality and User Interface (15 Marks)</t></is></c>
      <c r="B8" t="inlineStr" s="5"><is><t>Full working store, catalog, cart, digital payment, tracking, 1-tap login &amp; admin dashboard.</t></is></c>
    </row>
    <row r="9" ht="20" customHeight="1">
      <c r="A9" t="inlineStr" s="4"><is><t>2. Viva Voce (10 Marks)</t></is></c>
      <c r="B9" t="inlineStr" s="4"><is><t>Code explanation, problem statement understanding, HTML/CSS/JS concepts &amp; individual contribution.</t></is></c>
    </row>
    <row r="10" ht="20" customHeight="1">
      <c r="A10" t="inlineStr" s="5"><is><t>3. Video Presentation (5 Marks)</t></is></c>
      <c r="B10" t="inlineStr" s="5"><is><t>Demonstration of working project with all team members participating.</t></is></c>
    </row>
    <row r="11" ht="20" customHeight="1">
      <c r="A11" t="inlineStr" s="3"><is><t>Note: See Sheet 2 ('Project_Details_&amp;_Viva') for the complete Viva Q&amp;A guide and presentation script.</t></is></c>
    </row>
  </sheetData>
</worksheet>"""

    # Sheet 2: Project Details, Architecture, and Viva Questions
    sheet2 = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <cols>
    <col min="1" max="1" width="28" customWidth="1"/>
    <col min="2" max="2" width="45" customWidth="1"/>
    <col min="3" max="3" width="55" customWidth="1"/>
  </cols>
  <sheetData>
    <row r="1" ht="26" customHeight="1">
      <c r="A1" t="inlineStr" s="2"><is><t>PROJECT SPECIFICATION &amp; VIVA COMPREHENSIVE GUIDE</t></is></c>
    </row>
    <row r="2" ht="18" customHeight="1">
      <c r="A2" t="inlineStr" s="3"><is><t>Problem Statement 1: Local Market Online Store for Small Vendors (CSE326)</t></is></c>
    </row>
    <row r="3" ht="10" customHeight="1"></row>

    <!-- Table Header -->
    <row r="4" ht="28" customHeight="1">
      <c r="A4" t="inlineStr" s="1"><is><t>Module / Component</t></is></c>
      <c r="B4" t="inlineStr" s="1"><is><t>Implementation &amp; File Reference</t></is></c>
      <c r="C4" t="inlineStr" s="1"><is><t>Rubric Description &amp; Technical Details</t></is></c>
    </row>

    <!-- Rows -->
    <row r="5" ht="38" customHeight="1">
      <c r="A5" t="inlineStr" s="4"><is><t>1. Home Showcase &amp; Discovery</t></is></c>
      <c r="B5" t="inlineStr" s="4"><is><t>index.html | css/style.css | js/main.js</t></is></c>
      <c r="C5" t="inlineStr" s="4"><is><t>Glassmorphic navigation, animated hero banner, weekly harvest cards, community testimonials &amp; live cart counter.</t></is></c>
    </row>
    <row r="6" ht="38" customHeight="1">
      <c r="A6" t="inlineStr" s="5"><is><t>2. Marketplace &amp; Multi-Filtering</t></is></c>
      <c r="B6" t="inlineStr" s="5"><is><t>shop.html | js/shop.js</t></is></c>
      <c r="C6" t="inlineStr" s="5"><is><t>Dynamic category filters, INR price slider (₹50-₹1000), organic/artisan badges, stall picker, product comparison modal &amp; quick reviews.</t></is></c>
    </row>
    <row r="7" ht="38" customHeight="1">
      <c r="A7" t="inlineStr" s="4"><is><t>3. Vendor Stalls Directory</t></is></c>
      <c r="B7" t="inlineStr" s="4"><is><t>vendors.html | js/vendors.js</t></is></c>
      <c r="C7" t="inlineStr" s="4"><is><t>Verified seller cards with neighborhood badges, craft specialties, distance metrics, and direct shop links.</t></is></c>
    </row>
    <row r="8" ht="38" customHeight="1">
      <c r="A8" t="inlineStr" s="5"><is><t>4. Vendor Onboarding Portal</t></is></c>
      <c r="B8" t="inlineStr" s="5"><is><t>join-vendor.html</t></is></c>
      <c r="C8" t="inlineStr" s="5"><is><t>Interactive vendor registration form, FSSAI/permit dropzone simulator, fee transparency &amp; animated FAQ accordion.</t></is></c>
    </row>
    <row r="9" ht="38" customHeight="1">
      <c r="A9" t="inlineStr" s="4"><is><t>5. Admin &amp; Vendor Dashboard</t></is></c>
      <c r="B9" t="inlineStr" s="4"><is><t>dashboard.html | js/dashboard.js</t></is></c>
      <c r="C9" t="inlineStr" s="4"><is><t>Live revenue KPI in ₹ INR, inventory table with '+10 Restock', product creator, order dispatch status updater, and 1-tap role switcher.</t></is></c>
    </row>
    <row r="10" ht="38" customHeight="1">
      <c r="A10" t="inlineStr" s="5"><is><t>6. One-Tap Authentication</t></is></c>
      <c r="B10" t="inlineStr" s="5"><is><t>js/main.js (#googleOneTapPrompt, #authModal)</t></is></c>
      <c r="C10" t="inlineStr" s="5"><is><t>Google-style floating 1-tap sign-in, Customer (Aarav), Admin, and Vendor demo profiles with localStorage state persistence.</t></is></c>
    </row>
    <row r="11" ht="38" customHeight="1">
      <c r="A11" t="inlineStr" s="4"><is><t>7. Digital Checkout &amp; Tracking</t></is></c>
      <c r="B11" t="inlineStr" s="4"><is><t>js/main.js (#cartDrawer, #orderTrackingModal)</t></is></c>
      <c r="C11" t="inlineStr" s="4"><is><t>UPI/Card/COD simulated payments, free shipping progress bar (&gt;₹499), discount coupons, and 4-step dispatch status tracker.</t></is></c>
    </row>
    <row r="12" ht="25" customHeight="1"></row>

    <!-- Viva Q&A Section -->
    <row r="13" ht="26" customHeight="1">
      <c r="A13" t="inlineStr" s="2"><is><t>TOP VIVA QUESTIONS &amp; ANSWERS (10 MARKS PREPARATION)</t></is></c>
    </row>
    <row r="14" ht="28" customHeight="1">
      <c r="A14" t="inlineStr" s="1"><is><t>Viva Question</t></is></c>
      <c r="B14" t="inlineStr" s="1"><is><t>Key Concept</t></is></c>
      <c r="C14" t="inlineStr" s="1"><is><t>Model Answer for Faculty</t></is></c>
    </row>
    <row r="15" ht="42" customHeight="1">
      <c r="A15" t="inlineStr" s="4"><is><t>Q1: How is data managed without a backend?</t></is></c>
      <c r="B15" t="inlineStr" s="4"><is><t>HTML5 localStorage &amp; State Pattern</t></is></c>
      <c r="C15" t="inlineStr" s="4"><is><t>We created a centralized MarketStore module in js/main.js that initializes products, orders, and user sessions in localStorage. Any action persists across browser refreshes.</t></is></c>
    </row>
    <row r="16" ht="42" customHeight="1">
      <c r="A16" t="inlineStr" s="5"><is><t>Q2: How do CSS transitions and responsiveness work?</t></is></c>
      <c r="B16" t="inlineStr" s="5"><is><t>CSS Grid, Flexbox, Media Queries</t></is></c>
      <c r="C16" t="inlineStr" s="5"><is><t>We used CSS variables (--primary, --accent), smooth cubic-bezier transitions on hover states, keyframe slide-ins for drawers, and responsive breakpoints at 1024px, 768px, and 480px.</t></is></c>
    </row>
    <row r="17" ht="42" customHeight="1">
      <c r="A17" t="inlineStr" s="4"><is><t>Q3: How does the One-Tap login system function?</t></is></c>
      <c r="B17" t="inlineStr" s="4"><is><t>Simulated OAuth / One-Tap Widget</t></is></c>
      <c r="C17" t="inlineStr" s="4"><is><t>A fixed floating card replicates Google One-Tap. Clicking sign-in instantly authenticates the user, updates the header avatar, and unlocks role-specific views (e.g. Admin Dashboard).</t></is></c>
    </row>
  </sheetData>
</worksheet>"""

    # Create zip file
    with zipfile.ZipFile(output_path, 'w', zipfile.ZIP_DEFLATED) as z:
        z.writestr('[Content_Types].xml', content_types)
        z.writestr('_rels/.rels', root_rels)
        z.writestr('xl/_rels/workbook.xml.rels', wb_rels)
        z.writestr('xl/workbook.xml', workbook)
        z.writestr('xl/styles.xml', styles)
        z.writestr('xl/worksheets/sheet1.xml', sheet1)
        z.writestr('xl/worksheets/sheet2.xml', sheet2)

    print(f"Successfully created {output_path}")

if __name__ == '__main__':
    create_excel('/Users/adarshsingh/Desktop/CSE326/CA1_Project_Submission_Local_Market.xlsx')
