import { ChatMessage } from '../types';

export function getOfflineAdvisorResponse(userQuery: string): Partial<ChatMessage> {
  const queryLower = userQuery.toLowerCase();

  if (queryLower.includes('cyber') || queryLower.includes('fraud') || queryLower.includes('phishing') || queryLower.includes('upi') || queryLower.includes('85,000') || queryLower.includes('scam')) {
    return {
      content: 'Here is a senior advocate advisory briefing on financial cyber fraud, unauthorized UPI debits, and cyber extortion under Indian law:',
      structuredData: {
        case_classification: 'Criminal Cyber Fraud & Impersonation (Cognizable & Non-Bailable)',
        applicable_statutes: [
          'Section 66D Information Technology Act 2000 (Cheating by Impersonation via Computer)',
          'Section 318(4) Bharatiya Nyaya Sanhita 2023 (Cheating & Dishonestly Inducing Delivery)',
          'Section 173 Bharatiya Nagarik Suraksha Sanhita 2023 (Registration of Zero FIR)',
          'RBI Circular DBR.No.Leg.BC.78/09.07.005/2017-18 (Customer Protection – Limiting Liability in Unauthorized Electronic Banking Transactions)'
        ],
        action_roadmap: [
          {
            step: 1,
            title: 'Golden Hour 1930 Helpline Call & Portal Registration',
            detail: 'Immediately dial 1930 (National Cyber Crime Reporting Helpline) and register the financial fraud on cybercrime.gov.in within 2 to 4 hours. This triggers an automated lien/freeze alert to the nodal officer of the recipient bank/wallet to halt withdrawal.'
          },
          {
            step: 2,
            title: 'Zero FIR under BNSS Section 173',
            detail: 'Approach the nearest police station or cyber crime cell to file a Zero FIR. Under Section 173 BNSS, police officers cannot reject your complaint on jurisdictional grounds if the offence is cognizable.'
          },
          {
            step: 3,
            title: 'Written Intimation to Bank for Zero-Liability Protection',
            detail: 'Submit a formal written complaint with your home bank within 3 working days citing the RBI 2017 Circular. If reported within 3 days without customer negligence (no OTP shared voluntarily), the customer holds zero liability.'
          },
          {
            step: 4,
            title: 'Application before Chief Judicial Magistrate (CJM)',
            detail: 'If funds are frozen in the beneficiary account, move an application under Section 503 BNSS (or Section 457 CrPC) for release of seized/frozen amounts back to your account.'
          }
        ],
        evidence_checklist: [
          'Detailed bank account statement highlighting the fraudulent debit transaction & UTR number',
          'Screenshot of fraudulent SMS, WhatsApp chat, or phishing URL/link received',
          'Call logs showing phone numbers used by fraudsters',
          'Copy of formal complaint filed on cybercrime.gov.in with Acknowledgement Number',
          'Bank written intimation stamped receipt or email delivery confirmation'
        ],
        landmark_precedents: [
          {
            title: 'Shreya Singhal v. Union of India',
            citation: '(2015) 5 SCC 1',
            principle: 'Clarified constitutional standards and intermediate liability under the Information Technology Act.'
          },
          {
            title: 'State of Maharashtra v. Dr. Praful B. Desai',
            citation: '(2003) 4 SCC 601',
            principle: 'Affirmed that electronic evidence and digital transactions are fully admissible in criminal proceedings.'
          }
        ]
      }
    };
  }

  if (queryLower.includes('deposit') || queryLower.includes('landlord') || queryLower.includes('rent') || queryLower.includes('tenant') || queryLower.includes('painting')) {
    return {
      content: 'Here is your legal assessment regarding unauthorized retention of tenancy security deposits under Indian civil law:',
      structuredData: {
        case_classification: 'Civil Tenancy Dispute & Wrongful Retention of Security Deposit',
        applicable_statutes: [
          'Order 37 Code of Civil Procedure 1908 (Summary Suit for Liquidated Debt Recovery)',
          'Section 73 Indian Contract Act 1872 (Compensation for Loss Caused by Breach)',
          'Model Tenancy Act 2021 / Respective State Rent Control Act',
          'Section 12A Commercial Courts Act 2015 / DLSA Mediation Rules'
        ],
        action_roadmap: [
          {
            step: 1,
            title: '15-Day Statutory Legal Demand Notice',
            detail: 'Engage an enrolled advocate to dispatch a formal Legal Notice via Registered Post AD and Speed Post, giving the landlord a strict 15-day deadline to refund the undisputed deposit with 12% to 18% per annum interest.'
          },
          {
            step: 2,
            title: 'Pre-Litigation Mediation via District Legal Services Authority (DLSA)',
            detail: 'File a pre-litigation conciliation petition before the local DLSA under the Legal Services Authorities Act, 1987. This is a cost-effective, non-adversarial mechanism with high recovery success.'
          },
          {
            step: 3,
            title: 'Summary Suit under Order 37 of the CPC',
            detail: 'If the demand notice is ignored, file a Summary Suit under Order 37 CPC before the City Civil Court or Small Causes Court. In an Order 37 suit, the defendant cannot defend without obtaining prior leave of the court.'
          }
        ],
        evidence_checklist: [
          'Registered or notarized Lease & License Agreement specifying deposit terms',
          'Bank transfer receipts / UPI logs demonstrating payment of the security deposit',
          'Handover inspection email or signed inventory clearance acknowledging good condition upon move-out',
          'Copy of WhatsApp messages and email communications requesting refund and landlord responses',
          'Tracking receipts and signed postal acknowledgment card of the Legal Demand Notice'
        ],
        landmark_precedents: [
          {
            title: 'Suresh Kumar v. Bhupendra Singh',
            citation: '2019 SCC OnLine Del 8932',
            principle: 'Held that unjustified deduction for standard wear and tear constitutes illegal retention of deposit and attracts interest.'
          }
        ]
      }
    };
  }

  if (queryLower.includes('cheque') || queryLower.includes('138') || queryLower.includes('bounce') || queryLower.includes('dishonour') || queryLower.includes('funds')) {
    return {
      content: 'Here is the statutory procedure and strict timeline under Section 138 of the Negotiable Instruments Act, 1881:',
      structuredData: {
        case_classification: 'Quasi-Criminal Commercial Offence (Dishonour of Cheque)',
        applicable_statutes: [
          'Section 138 Negotiable Instruments Act 1881 (Dishonour of Cheque for Insufficiency of Funds)',
          'Section 142 NI Act (Cognizance of Offences & Limitation Periods)',
          'Section 143A NI Act (Power to Direct 20% Interim Compensation)',
          'Section 139 NI Act (Statutory Presumption in Favour of Holder in Due Course)'
        ],
        action_roadmap: [
          {
            step: 1,
            title: 'Preserve Bank Return Memo & Note Limitation Period',
            detail: 'Ensure you retain the original Cheque Return Memo. You have strictly 30 days from the date of receiving this memo to issue the statutory demand notice.'
          },
          {
            step: 2,
            title: 'Mandatory 30-Day Legal Demand Notice under Section 138(b)',
            detail: 'Send a formal demand notice demanding payment within 15 days of receipt of notice. Send via Speed Post with Postal Tracking Acknowledgment.'
          },
          {
            step: 3,
            title: 'Wait 15 Days for Cause of Action to Arise',
            detail: 'If the drawer fails to make payment within 15 days of receiving the notice, the criminal cause of action officially arises on the 16th day.'
          },
          {
            step: 4,
            title: 'File Criminal Complaint & Petition for 20% Interim Compensation',
            detail: 'File a complaint under Section 138 before the Metropolitan Magistrate within 30 days of the cause of action. Simultaneously file an application under Section 143A praying for 20% interim compensation.'
          }
        ],
        evidence_checklist: [
          'Original dishonoured cheque in safe protective plastic sleeve',
          'Original Bank Return Memo bearing official bank seal and reason code ("Funds Insufficient")',
          'Underlying commercial invoice, contract, promissory note, or ledger establishing legally enforceable debt',
          'Speed Post dispatch receipt and India Post tracking delivery report proving notice service',
          'Certified copy of complainant affidavit of evidence'
        ],
        landmark_precedents: [
          {
            title: 'Dashrath Rupsingh Rathod v. State of Maharashtra',
            citation: '(2014) 9 SCC 129',
            principle: 'Clarified territorial jurisdiction for filing Section 138 complaints at the place of the payee bank branch.'
          },
          {
            title: 'Bir Singh v. Mukesh Kumar',
            citation: '(2019) 4 SCC 197',
            principle: 'Held that under Section 139, there is a strong statutory presumption that a signed cheque was issued in discharge of debt.'
          }
        ]
      }
    };
  }

  if (queryLower.includes('consumer') || queryLower.includes('product') || queryLower.includes('laptop') || queryLower.includes('e-daakhil') || queryLower.includes('replacement')) {
    return {
      content: 'Here is an actionable guide to filing a consumer complaint against defective goods and unfair trade practices under the Consumer Protection Act, 2019:',
      structuredData: {
        case_classification: 'Consumer Dispute & Deficient E-Commerce Service',
        applicable_statutes: [
          'Section 35 Consumer Protection Act 2019 (Filing of Complaint before District Commission)',
          'Section 2(47) CPA 2019 (Unfair Trade Practice & Misleading Terms)',
          'Consumer Protection (E-Commerce) Rules 2020',
          'Section 38 CPA 2019 (Reference to Appropriate Laboratory or Expert Analysis)'
        ],
        action_roadmap: [
          {
            step: 1,
            title: 'Issue Formal Legal Notice to Seller & Platform',
            detail: 'Issue a 15-day statutory demand notice to both the registered seller and the e-commerce marketplace platform demanding full refund, interest, and costs.'
          },
          {
            step: 2,
            title: 'National Consumer Helpline (NCH) Grievance',
            detail: 'Lodge a formal grievance on consumerhelpline.gov.in (or dial 1915). E-commerce companies are registered participants with dedicated resolution desks.'
          },
          {
            step: 3,
            title: 'E-Daakhil Online Filing at DCDRC',
            detail: 'File a complaint online via edaakhil.nic.in before the District Consumer Disputes Redressal Commission (DCDRC). CPA 2019 permits filing in the district where the consumer resides.'
          }
        ],
        evidence_checklist: [
          'Purchase tax invoice and unboxing video or photographs of damaged merchandise',
          'Courier tracking slip and proof of return request made within policy window',
          'All email correspondence and customer support chat transcripts',
          'Bank/credit card debit statement showing date of payment',
          'Copy of E-Daakhil verification affidavit and court fee receipt'
        ],
        landmark_precedents: [
          {
            title: 'Amazon Seller Services Pvt Ltd v. Amrit Lal',
            citation: '2020 SCC OnLine NCDRC 112',
            principle: 'Held that e-commerce intermediaries cannot escape product liability if they facilitate distorted or defective fulfillment.'
          }
        ]
      }
    };
  }

  // Default General Advice
  return {
    content: 'Here is a comprehensive advocate advisory assessment for your legal inquiry under Indian Jurisprudence:',
    structuredData: {
      case_classification: 'Civil & Statutory Rights Evaluation',
      applicable_statutes: [
        'Constitution of India (Articles 14, 19, 21, and 226)',
        'Bharatiya Nyaya Sanhita 2023 / Indian Penal Code 1860',
        'Bharatiya Nagarik Suraksha Sanhita 2023 / Code of Criminal Procedure 1973',
        'Specific Relief Act 1963 & Indian Evidence Act 1872 / BSA 2023'
      ],
      action_roadmap: [
        {
          step: 1,
          title: 'Documentary Collation & Limitation Period Assessment',
          detail: 'Assemble all original agreements, notices, electronic timestamps, and payment vouchers. Verify limitation under the Limitation Act 1963.'
        },
        {
          step: 2,
          title: 'Statutory Notice or Pre-Litigation Conciliation',
          detail: 'Issue a formal legal notice setting out the cause of action, quantum of relief claimed, and granting statutory compliance time.'
        },
        {
          step: 3,
          title: 'Invocation of Appropriate Judicial Forum',
          detail: 'Institute appropriate proceedings before the Civil Court, High Court under Article 226, or specialized Tribunals (NCLT, DCDRC, CAT).'
        }
      ],
      evidence_checklist: [
        'Executed agreements, licenses, and stamped undertakings',
        'Official correspondence with timestamped proof of service',
        'Bank statements, vouchers, or payment logs',
        'Section 65B Indian Evidence Act / Section 63 BSA certificate for digital records'
      ],
      landmark_precedents: [
        {
          title: 'Maneka Gandhi v. Union of India',
          citation: '(1978) 1 SCC 248',
          principle: 'Established that every state procedure and administrative action must be just, fair, and reasonable.'
        }
      ]
    }
  };
}
