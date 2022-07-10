import * as React from "react"
import { Intl } from "../../components/Intl"
import { Layout } from "../../components/layout"

type Props = {
  pageContext: any
  b: NewableFunction
}

const Index: React.FC<Props> = (props) => {

  return <Layout title="How to set up Lingua Franca" description="Use Lingua Franca" lang={props.pageContext.lang}>
    <div className="raised main-content-block">
      <h1>Download and Install Lingua Franca</h1>
      <p>
        All Lingua Franca tools require Java 17 or up (<a href="https://www.oracle.com/java/technologies/downloads/">download from Oracle</a>).
        Each target language may have additional requirements. See the <a href="/docs/handbook/target-language-details#requirements">Target Language Details</a> page and select your target language.
        The alternatives:
        <ul>
          <li><a href="#vscode">Use the Visual Studio Code extension</a></li>
          <li><a href="#download-epoch">Download Epoch, the Eclipse-based IDE</a></li>
          <li><a href="#download-cl">Download the command-line tools</a></li>
          <li><a href="#developer">Developer setup, if you will be contributing to Lingua Franca</a></li>
          <li><a href="https://vm.lf-lang.org/">Download an Ubuntu virtual machine with Epoch preinstalled</a></li>
        </ul>
      </p>
    </div>
    <div className="raised main-content-block">
    <h2 id="vscode">Visual Studio Code</h2>
      <p>The easiest way to get started with Lingua Franca is to install our Visual Studio Code extension from the 
        <a href="https://marketplace.visualstudio.com/items?itemName=lf-lang.vscode-lingua-franca">Visual Studio Marketplace</a>
        or <a href="https://open-vsx.org/extension/lf-lang/vscode-lingua-franca">VSX Registry</a>.
        To install this extension from the marketplace, launch VS Code Quick Open (<kbd>Ctrl</kbd> + <kbd>P</kbd>) and enter `ext install lf-lang.vscode-lingua-franca`.
        See <a href="/docs/handbook/code-extension">more details</a>.
      </p>
    </div>

    <div className="raised main-content-block">
      <h2 id="download-epoch">Epoch IDE</h2>
      <p>Epoch can be installed in any directory. 
        It is convenient to add the installation directory to your <code>PATH</code>. 
        On a Mac, you can drag <code>epoch.app</code> to the Applications folder and open it from anywhere using <code>open -a epoch</code>.
        To download the current development version of Epoch, replace the following tar and zip files with those from the <a href="https://github.com/lf-lang/lingua-franca/releases/tag/nightly">nightly build</a>.
      </p>
      <section style={{ display: "flex", flexWrap: "wrap" }}>
        <div style={{ borderRight: "1px lightgrey solid", padding: "1rem", flex: 1, minWidth: "240px" }}>
          <h3>Linux</h3>
          Download <a href="https://github.com/lf-lang/lingua-franca/releases/download/v0.2.1/epoch_ide_0.2.1-linux.gtk.x86_64.tar.gz">Epoch IDE 0.2.1 for Linux</a> and run:
      <p><code>tar xvf epoch_ide_0.2.1-linux.gtk.x86_64.tar.gz</code></p>
      <p><code>cd epoch_ide_0.2.1-linux.gtk.x86_64</code></p>
      <p><code>./epoch</code></p>
        </div>
        <div style={{ borderRight: "1px lightgrey solid", padding: "1rem", flex: 1, minWidth: "240px" }}>
          <h3>macOS</h3>
          Download <a href="https://github.com/lf-lang/lingua-franca/releases/download/v0.2.1/epoch_ide_0.2.1-macosx.cocoa.x86_64.tar.gz">Epoch IDE 0.2.1 for macOS</a> and run:
      <p><code>open epoch_ide_0.2.1-macosx.cocoa.x86_64.tar.gz</code></p>
      <p><code>xattr -cr epoch.app</code></p>
      <p><code>open epoch.app</code></p>
        </div>

        <div style={{ padding: "1rem", flex: 1, minWidth: "240px" }}>
          <h3>Windows</h3>
          Download <a href="https://github.com/lf-lang/lingua-franca/releases/download/v0.2.1/epoch_ide_0.2.1-win32.win32.x86_64.zip">Epoch IDE 0.2.1 for Windows</a> and run:
      <p><code>unzip epoch_ide_0.2.1-win32.win32.x86_64.zip</code></p>
      <p><code>cd epoch_ide_0.2.1-win32.win32.x86_64</code></p>
      <p><code>.\epoch</code></p>
         </div>
      </section>
      See <a href="/docs/handbook/epoch-ide">more details</a>.
    </div>

    <div className="raised main-content-block">
      <h2 id="download-cl">Lingua Franca Compiler (command-line)</h2>
      <p>Our command line compiler can be installed in any directory. 
        It is most convenient to add the <code>bin</code> directory to your <code>PATH</code>.
        To download the current development version of the command-line tools, replace the following tar and zip files with those from the <a href="https://github.com/lf-lang/lingua-franca/releases/tag/nightly">nightly build</a>.
      </p>
      <section style={{ display: "flex", flexWrap: "wrap" }}>
        <div style={{ borderRight: "1px lightgrey solid", padding: "1rem", flex: 1, minWidth: "240px" }}>
          <h3>Linux and macOS</h3>
          Download <a href="https://github.com/lf-lang/lingua-franca/releases/download/v0.2.1/lfc_0.2.1.tar.gz">lfc 0.2.1 for Linux/Mac</a> and run:
      <p><code>tar xvf lfc_0.2.1.tar.gz</code></p>
      <p><code>./lfc_0.2.1/bin/lfc --version</code></p>
        </div>
        <div style={{padding: "1rem", flex: 1, minWidth: "240px" }}>
          <h3>Windows</h3>
          Download <a href="https://github.com/lf-lang/lingua-franca/releases/download/v0.2.1/lfc_0.2.1.zip">lfc 0.2.1 for Windows</a> and run:
      <p><code>unzip lfc_0.2.1.zip</code></p>
      <p><code>.\lfc_0.2.1\bin\lfc.ps1 --version</code></p>
        </div>
      </section>
      See <a href="/docs/handbook/command-line-tools">more details</a>.
    </div>

    <div className="raised main-content-block">
      <h2 id="developer">Developer Setup</h2>
      <p>If you'd like to contribute to Lingua Franca and build our toolchain on your own, you will need to check out our <a href="https://repo.lf-lang.org/">GitHub repository</a>. The toolchain can built using Gradle or Maven, which have integrations with most IDEs. For Eclipse users, we provide an Oomph setup.</p>

      <section style={{ display: "flex", flexWrap: "wrap" }}>
        <div style={{ borderRight: "1px lightgrey solid", padding: "1rem", flex: 1, minWidth: "240px" }}>
          <h3>Cloning our repository</h3>
          <ul>
          <li>If you have public-key authentication set up:
          <p><code>git clone git@github.com:lf-lang/lingua-franca.git</code></p>
          </li>
          <li>If you prefer to clone using the web URL:
          <p><code>git clone https://github.com/lf-lang/lingua-franca.git</code></p>
          </li>
          </ul>
          
        </div>
        <div style={{ borderRight: "1px lightgrey solid", padding: "1rem", flex: 1, minWidth: "240px" }}>
          <h3>Building from the command line</h3>
          <ul>
            <li>Gradle: 
                <p><code>./gradlew assemble</code> (the build also performs tests, which takes a long time)</p>
            </li>
            <li style={{ marginTop: "20px" }}>
            Maven:
            <p><code>mvn compile</code> (you need to install Maven first)</p>
            </li>
          </ul>
        </div>
        
        <div style={{ padding: "1rem", flex: 1, minWidth: "240px" }}>
          <h3>Oomph setup for Eclipse</h3>
          <ul>
              <li>Download the <a href="https://www.eclipse.org/downloads/index.php">Eclipse installer</a>.</li>
              <li>
              Click the Hamburger button at the top right corner and switch to "Advanced Mode".
              </li>
              <li>
              Select "Eclipse IDE for Java and DSL developers".
              </li>
              <li>
              Continue reading <a href="/docs/handbook/eclipse-oomph">here...</a>
              </li>
          </ul>
         </div>
      </section>
    </div>
    

  </Layout>
}

export default (props: Props) => <Intl locale={props.pageContext.lang}><Index {...props} /></Intl>

/*
<QuickJump title="Learning Resources" lang={props.pageContext.lang} />
 <p>Some of code generator components are written in Kotlin, which is not supported by Eclipse.</p>
          <p>If you want a Kotlin-friendly developer environment using IntelliJ, you can follow the Developer IntelliJ Setup (for Kotlin) instructions to set it up.</p> 
          <p>To build the Lingua Franca IDE (Epoch) with Kotlin-based code generators enabled (which is not possible with the Eclipse setup), please see the instructions in Running Lingua Franca IDE (Epoch) with Kotlin based Code Generators Enabled (without Eclipse Environment).</p>
 */
