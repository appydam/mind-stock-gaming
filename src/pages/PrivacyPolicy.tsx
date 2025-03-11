
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Shield, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  const lastUpdated = "March 15, 2023";

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <Link to="/">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div className="text-sm text-muted-foreground">
                Last Updated: {lastUpdated}
              </div>
            </div>

            <div className="flex items-center mb-8">
              <Shield className="h-10 w-10 text-primary mr-4" />
              <h1 className="font-display text-4xl font-bold">Privacy Policy</h1>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="lead">
                At MindStock, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
              </p>

              <h2>1. Information We Collect</h2>
              <h3>1.1 Personal Information</h3>
              <p>
                When you register for MindStock, we collect certain personal information, including:
              </p>
              <ul>
                <li>Full name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Date of birth</li>
                <li>Payment information (when you make deposits)</li>
                <li>Government-issued ID (for KYC verification, when applicable)</li>
              </ul>

              <h3>1.2 Usage Information</h3>
              <p>
                We automatically collect certain information about your device and how you interact with MindStock, including:
              </p>
              <ul>
                <li>IP address</li>
                <li>Device type and operating system</li>
                <li>Browser type</li>
                <li>Pages visited and time spent on MindStock</li>
                <li>Competition participation and portfolio selections</li>
                <li>Transaction history</li>
              </ul>

              <h2>2. How We Use Your Information</h2>
              <p>
                We use the information we collect for various purposes, including:
              </p>
              <ul>
                <li>Providing and maintaining MindStock</li>
                <li>Processing transactions and managing user accounts</li>
                <li>Verifying your identity and preventing fraud</li>
                <li>Improving MindStock's features and user experience</li>
                <li>Communicating with you about competitions, promotions, and updates</li>
                <li>Complying with legal obligations</li>
              </ul>

              <h2>3. How We Share Your Information</h2>
              <p>
                We may share your information with:
              </p>
              <ul>
                <li><strong>Service Providers:</strong> Companies that perform services on our behalf, such as payment processing, data analysis, and customer service</li>
                <li><strong>Business Partners:</strong> Companies with whom we offer co-branded services or promotions</li>
                <li><strong>Legal Authorities:</strong> When required by law, court order, or government regulation</li>
                <li><strong>Other MindStock Users:</strong> Limited information (such as username and portfolio performance) may be visible to other users through leaderboards and competitions</li>
              </ul>
              <p>
                We do not sell your personal information to third parties.
              </p>

              <h2>4. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, no internet transmission is 100% secure, and we cannot guarantee the security of information transmitted through MindStock.
              </p>

              <h2>5. Your Privacy Rights</h2>
              <p>
                Depending on your location, you may have rights regarding your personal information, including:
              </p>
              <ul>
                <li>Accessing and obtaining a copy of your data</li>
                <li>Correcting inaccurate personal information</li>
                <li>Deleting your personal information</li>
                <li>Restricting or objecting to processing of your data</li>
                <li>Data portability</li>
                <li>Withdrawing consent</li>
              </ul>
              <p>
                To exercise these rights, please contact us using the information provided in Section 10.
              </p>

              <h2>6. Data Retention</h2>
              <p>
                We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When determining how long to retain your information, we consider:
              </p>
              <ul>
                <li>The amount, nature, and sensitivity of the personal information</li>
                <li>The potential risk of harm from unauthorized use or disclosure</li>
                <li>The purposes for which we process your personal information</li>
                <li>Applicable legal requirements</li>
              </ul>

              <h2>7. Children's Privacy</h2>
              <p>
                MindStock is not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us.
              </p>

              <h2>8. Cookies and Similar Technologies</h2>
              <p>
                We use cookies and similar tracking technologies to collect and use information about you and your device. You can set your browser to refuse all or some browser cookies, but this may affect your ability to access certain features of MindStock.
              </p>

              <h2>9. Changes to this Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on MindStock and updating the "Last Updated" date at the top of this page. You are advised to review this Privacy Policy periodically for any changes.
              </p>

              <h2>10. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy or our privacy practices, please contact us at:
              </p>
              <p>
                <strong>Email:</strong> privacy@mindstock.com<br />
                <strong>Address:</strong> MindStock Headquarters, 123 Trading Street, Bangalore, Karnataka, India
              </p>
            </div>

            <div className="mt-10 border-t border-border pt-6">
              <div className="flex justify-between items-center">
                <Link to="/terms">
                  <Button variant="outline">View Terms of Service</Button>
                </Link>
                <Link to="/help">
                  <Button variant="outline">Help Center</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
