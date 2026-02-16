#!/usr/bin/env node

/**
 * Verification script for react-helmet-async deployment fix
 * This script checks if the helmet deployment issue has been properly resolved
 */

import { readFileSync, existsSync } from "fs";
import { join } from "path";

const COLORS = {
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  reset: "\x1b[0m",
};

const log = {
  success: (msg) => console.log(`${COLORS.green}✅ ${msg}${COLORS.reset}`),
  error: (msg) => console.log(`${COLORS.red}❌ ${msg}${COLORS.reset}`),
  warning: (msg) => console.log(`${COLORS.yellow}⚠️  ${msg}${COLORS.reset}`),
  info: (msg) => console.log(`${COLORS.blue}ℹ️  ${msg}${COLORS.reset}`),
};

class HelmetVerifier {
  constructor() {
    this.projectRoot = process.cwd();
    this.checks = [];
    this.errors = [];
    this.warnings = [];
  }

  readFileContent(filePath) {
    try {
      const fullPath = join(this.projectRoot, filePath);
      if (!existsSync(fullPath)) {
        throw new Error(`File not found: ${filePath}`);
      }
      return readFileSync(fullPath, "utf8");
    } catch (error) {
      this.errors.push(`Failed to read ${filePath}: ${error.message}`);
      return null;
    }
  }

  checkPackageJson() {
    log.info("Checking package.json dependencies...");
    const content = this.readFileContent("package.json");

    if (!content) return false;

    try {
      const pkg = JSON.parse(content);
      const deps = { ...pkg.dependencies, ...pkg.devDependencies };

      // Check for react-helmet-async
      if (deps["react-helmet-async"]) {
        log.success(`Found react-helmet-async: ${deps["react-helmet-async"]}`);
        this.checks.push("react-helmet-async dependency found");
      } else {
        log.error("react-helmet-async not found in dependencies");
        this.errors.push("Missing react-helmet-async dependency");
        return false;
      }

      // Check for old react-helmet
      if (deps["react-helmet"]) {
        log.warning(`Old react-helmet still present: ${deps["react-helmet"]}`);
        this.warnings.push("Old react-helmet dependency should be removed");
      } else {
        log.success("Old react-helmet dependency removed");
        this.checks.push("Old react-helmet removed");
      }

      return true;
    } catch (error) {
      log.error(`Invalid package.json: ${error.message}`);
      this.errors.push("Invalid package.json format");
      return false;
    }
  }

  checkMainJsx() {
    log.info("Checking main.jsx for HelmetProvider...");
    const content = this.readFileContent("src/main.jsx");

    if (!content) return false;

    // Check for HelmetProvider import
    if (
      content.includes('import { HelmetProvider } from "react-helmet-async"')
    ) {
      log.success("HelmetProvider import found");
      this.checks.push("HelmetProvider import correct");
    } else {
      log.error("HelmetProvider import not found or incorrect");
      this.errors.push("Missing HelmetProvider import in main.jsx");
      return false;
    }

    // Check for HelmetProvider wrapper
    if (content.includes("<HelmetProvider>")) {
      log.success("HelmetProvider wrapper found");
      this.checks.push("HelmetProvider wrapper present");
    } else {
      log.error("HelmetProvider wrapper not found");
      this.errors.push("Missing HelmetProvider wrapper in main.jsx");
      return false;
    }

    return true;
  }

  checkHelmetImports() {
    log.info("Checking component helmet imports...");
    const filesToCheck = [
      "src/components/SEO.jsx",
      "src/components/Analytics.jsx",
    ];

    let allCorrect = true;

    for (const file of filesToCheck) {
      const content = this.readFileContent(file);

      if (!content) {
        allCorrect = false;
        continue;
      }

      // Check for correct import
      if (content.includes('import { Helmet } from "react-helmet-async"')) {
        log.success(`${file}: Correct helmet import found`);
        this.checks.push(`${file} import updated`);
      } else if (content.includes('import { Helmet } from "react-helmet"')) {
        log.error(`${file}: Still using old react-helmet import`);
        this.errors.push(`${file} needs import update`);
        allCorrect = false;
      } else if (content.includes("Helmet")) {
        log.warning(`${file}: Helmet usage found but import unclear`);
        this.warnings.push(`${file} helmet import needs verification`);
      } else {
        log.info(`${file}: No helmet usage detected (OK)`);
      }
    }

    return allCorrect;
  }

  checkBuildScript() {
    log.info("Checking build configuration...");
    const content = this.readFileContent("package.json");

    if (!content) return false;

    try {
      const pkg = JSON.parse(content);

      if (pkg.scripts && pkg.scripts.build) {
        log.success(`Build script found: ${pkg.scripts.build}`);
        this.checks.push("Build script configured");

        // Check if prerender is part of build
        if (pkg.scripts.build.includes("prerender")) {
          log.info("Prerender detected in build script");
          this.checks.push("Prerender integration found");
        }

        return true;
      } else {
        log.warning("No build script found");
        this.warnings.push("Build script not configured");
        return false;
      }
    } catch (error) {
      log.error(`Error checking build script: ${error.message}`);
      return false;
    }
  }

  checkViteConfig() {
    log.info("Checking Vite configuration...");
    const content = this.readFileContent("vite.config.js");

    if (!content) {
      // Try .mjs extension
      const mjsContent = this.readFileContent("vite.config.mjs");
      if (!mjsContent) {
        log.warning("No vite.config.js found");
        this.warnings.push("Vite config not found");
        return false;
      }
    }

    log.success("Vite configuration found");
    this.checks.push("Vite config present");
    return true;
  }

  generateReport() {
    console.log("\n" + "=".repeat(60));
    console.log("🔍 HELMET DEPLOYMENT FIX VERIFICATION REPORT");
    console.log("=".repeat(60));

    console.log(`\n📊 Summary:`);
    console.log(`✅ Successful checks: ${this.checks.length}`);
    console.log(`❌ Errors: ${this.errors.length}`);
    console.log(`⚠️  Warnings: ${this.warnings.length}`);

    if (this.checks.length > 0) {
      console.log(`\n${COLORS.green}✅ Successful Checks:${COLORS.reset}`);
      this.checks.forEach((check) => console.log(`   • ${check}`));
    }

    if (this.errors.length > 0) {
      console.log(`\n${COLORS.red}❌ Errors (Must Fix):${COLORS.reset}`);
      this.errors.forEach((error) => console.log(`   • ${error}`));
    }

    if (this.warnings.length > 0) {
      console.log(
        `\n${COLORS.yellow}⚠️  Warnings (Recommended):${COLORS.reset}`,
      );
      this.warnings.forEach((warning) => console.log(`   • ${warning}`));
    }

    console.log("\n" + "=".repeat(60));

    if (this.errors.length === 0) {
      log.success("🎉 All critical checks passed! Deployment should work.");
      console.log("\n📋 Next Steps:");
      console.log("   1. Run: npm install");
      console.log("   2. Run: npm run build");
      console.log("   3. Test: npm run preview");
      console.log("   4. Deploy with confidence! 🚀");
      return true;
    } else {
      log.error("🚨 Critical issues found. Please fix before deploying.");
      console.log("\n🔧 Quick Fixes:");
      console.log("   1. npm uninstall react-helmet");
      console.log("   2. npm install react-helmet-async@^2.0.4");
      console.log(
        "   3. Update imports in components to use react-helmet-async",
      );
      console.log("   4. Add HelmetProvider wrapper in main.jsx");
      return false;
    }
  }

  async run() {
    console.log("🔍 Starting Helmet Deployment Fix Verification...\n");

    // Run all checks
    this.checkPackageJson();
    this.checkMainJsx();
    this.checkHelmetImports();
    this.checkBuildScript();
    this.checkViteConfig();

    // Generate final report
    const success = this.generateReport();

    // Exit with appropriate code
    process.exit(success ? 0 : 1);
  }
}

// Run the verifier
const verifier = new HelmetVerifier();
verifier.run().catch((error) => {
  console.error("Verification failed:", error);
  process.exit(1);
});
