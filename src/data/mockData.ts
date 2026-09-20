import { CaseLawRecord, QuickStarterCard } from '../types';

export const QUICK_STARTER_CARDS: QuickStarterCard[] = [
  {
    id: 'cyber-fraud',
    icon: 'ShieldAlert',
    title: 'Cyber Fraud & Financial Phishing',
    subtitle: '1930 Helpline, National Portal & Zero FIR',
    category: 'Criminal & IT Law',
    query: 'I lost ₹85,000 in an unauthorized UPI phishing scam yesterday. What is the immediate legal recourse, statutory notice, and FIR procedure in India?',
    acts: ['IT Act Sec 66D', 'BNS Sec 318(4)', 'BNSS Sec 173', 'RBI Circular 2017']
  },
  {
    id: 'landlord-deposit',
    icon: 'Home',
    title: 'Landlord Security Deposit Dispute',
    subtitle: '15-Day Statutory Legal Notice & CPC Order 37',
    category: 'Tenancy & Civil Law',
    query: 'My landlord in Bengaluru is refusing to refund my security deposit of ₹1,20,000 citing frivolous painting charges after I vacated with proper notice. How do I initiate legal recovery under CPC?',
    acts: ['Order 37 CPC', 'Indian Contract Act Sec 73', 'State Tenancy Act']
  },
  {
    id: 'consumer-defect',
    icon: 'ShoppingBag',
    title: 'Defective Product & Consumer Forum',
    subtitle: 'E-Daakhil DCDRC Filing under CPA 2019',
    category: 'Consumer Protection',
    query: 'An e-commerce platform delivered a damaged laptop worth ₹68,000 and refused replacement or refund within the 7-day window. How do I issue a demand notice and file on E-Daakhil?',
    acts: ['Consumer Protection Act Sec 35', 'CPA Sec 2(47) Unfair Trade', 'E-Commerce Rules 2020']
  },
  {
    id: 'wrongful-termination',
    icon: 'Briefcase',
    title: 'Wrongful Termination & Severance Pay',
    subtitle: 'Industrial Disputes Act Sec 25F & Gratuity',
    category: 'Labour & Employment',
    query: 'I was abruptly terminated by my tech employer without the mandatory 3-month notice period or severance compensation. What rights do I have under Indian labour and Shops & Establishment laws?',
    acts: ['Industrial Disputes Act Sec 25F', 'Payment of Gratuity Act 1972', 'Shops & Establishments Act']
  },
  {
    id: 'cheque-bounce',
    icon: 'CreditCard',
    title: 'Cheque Dishonour (Sec 138 NI Act)',
    subtitle: '30-Day Demand Notice & 20% Interim Relief',
    category: 'Commercial & Criminal Law',
    query: 'A business contractor issued a cheque of ₹3,50,000 that was dishonoured for "Insufficient Funds". What are the mandatory timelines for the 30-day statutory notice and Section 143A interim compensation?',
    acts: ['NI Act Sec 138', 'NI Act Sec 143A', 'Limitation Act']
  },
  {
    id: 'theft-arrest-safeguards',
    icon: 'Scale',
    title: 'Theft & Police Interrogation Safeguards',
    subtitle: 'BNS Sec 303, BNSS Sec 35 & Article 22 Rights',
    category: 'Criminal Justice & Constitution',
    query: 'A household employee was falsely accused of jewel theft and police are threatening detention without a formal summons. What are our rights under BNS 303, BNSS Section 35 notice, and Article 22?',
    acts: ['BNS Sec 303', 'BNSS Sec 35', 'Constitution Art 22', 'BSA Sec 63']
  }
];

export const LANDMARK_CASES: CaseLawRecord[] = [
  {
    id: 'navtej-singh-johar',
    metadata: {
      case_name: 'Navtej Singh Johar & Ors. v. Union of India',
      citation_number: '(2018) 10 SCC 1 | AIR 2018 SC 4321',
      court: 'Supreme Court of India (Constitution Bench)',
      judgment_date: '2018-09-06',
      bench: 'Dipak Misra, C.J.I., A.M. Khanwilkar, R.F. Nariman, D.Y. Chandrachud & Indu Malhotra, JJ.',
      acts_and_sections: [
        'IPC Section 377',
        'Constitution of India Article 14',
        'Constitution of India Article 15',
        'Constitution of India Article 19(1)(a)',
        'Constitution of India Article 21',
        'Protection of Human Rights Act 1993'
      ]
    },
    summary: {
      factual_matrix:
        'A batch of writ petitions was filed under Article 32 of the Constitution of India challenging the constitutional validity of Section 377 of the Indian Penal Code, 1860, insofar as it criminalized consensual sexual acts of adults in private. The legal battle originated when the Delhi High Court in Naz Foundation (2009) read down Section 377. However, in Suresh Kumar Koushal v. Naz Foundation (2014) 1 SCC 1, a two-judge bench of the Supreme Court reversed that ruling. Navtej Singh Johar (an acclaimed dancer), along with prominent LGBTQ+ citizens and organizations, approached the Supreme Court asserting that criminalization violated fundamental rights to equality, non-discrimination, expression, and human dignity.',
      factual_matrix_points: [
        {
          id: 'fm-1',
          text: 'Section 377 IPC criminalized "unnatural offences", penalizing carnal intercourse against the order of nature with imprisonment up to life.',
          para_ref: 1
        },
        {
          id: 'fm-2',
          text: 'The Delhi High Court had previously decriminalized consensual adult homosexuality in Naz Foundation v. Govt. of NCT of Delhi (2009).',
          para_ref: 3
        },
        {
          id: 'fm-3',
          text: 'A two-judge bench in Suresh Kumar Koushal (2014) overturned Naz Foundation on the grounds that LGBTQ+ persons constituted only a "miniscule fraction" of the population.',
          para_ref: 5
        },
        {
          id: 'fm-4',
          text: 'Petitioner Navtej Singh Johar, joined by chef Ritu Dalmia, hotelier Aman Nath and others, filed writ petitions pleading that criminalization stigmatized their fundamental personhood.',
          para_ref: 7
        }
      ],
      framed_issues: [
        'Whether Section 377 IPC violates the fundamental rights guaranteed under Articles 14 and 15 of the Constitution by discriminating on the grounds of sex and sexual orientation.',
        'Whether the criminalization of consensual homosexual acts in private impinges upon the right to personal liberty, privacy, and dignity under Article 21 as recognized in Puttaswamy.',
        'Whether Section 377 IPC imposes an unconstitutional chilling effect on freedom of expression and identity under Article 19(1)(a).',
        'Whether the doctrine of constitutional morality prevails over majoritarian social morality in constitutional adjudication.'
      ],
      framed_issues_detailed: [
        {
          id: 'fi-1',
          issue: 'Violation of Equality and Non-Discrimination under Articles 14 & 15: Does Section 377 create an arbitrary, hostile classification based on innate sexual orientation?',
          para_ref: 8,
          statute: 'Articles 14 & 15'
        },
        {
          id: 'fi-2',
          issue: 'Encroachment on Bodily Autonomy & Dignity under Article 21: Does the state have a legitimate interest in policing consensual intimate conduct between adults in private?',
          para_ref: 10,
          statute: 'Article 21'
        },
        {
          id: 'fi-3',
          issue: 'Freedom of Self-Expression under Article 19(1)(a): Does sexual orientation form an integral component of individual expressive freedom?',
          para_ref: 12,
          statute: 'Article 19(1)(a)'
        },
        {
          id: 'fi-4',
          issue: 'Standard of Constitutional Morality vs. Majoritarian Morality: Can constitutional rights be curtailed merely because public morality disfavors non-normative intimacy?',
          para_ref: 15,
          statute: 'Basic Structure Doctrine'
        }
      ],
      appellant_arguments:
        'Senior Advocates Mukul Rohatgi, Arvind Datar, Shyam Divan, and Menaka Guruswamy argued that sexual orientation is an inherent biological trait that cannot be penalized. They submitted that Koushal was fundamentally flawed in holding that fundamental rights depend on the demographic size of a minority. Relying on Puttaswamy (2017) and NALSA (2014), they established that dignity, privacy, and sexual autonomy are core facets of Article 21. Furthermore, "sex" in Article 15(1) encompasses sexual orientation; hence Section 377 constitutes direct discrimination.',
      appellant_arguments_points: [
        {
          id: 'ap-1',
          counsel: 'Senior Adv. Mukul Rohatgi',
          argument: 'Sexual orientation is natural, innate, and immutable. Criminalizing consensual acts between adults violates basic human dignity and personal freedom.',
          para_ref: 17
        },
        {
          id: 'ap-2',
          counsel: 'Senior Adv. Arvind Datar',
          argument: 'Section 377 creates a chilling effect, subjecting an entire community to systemic extortion, harassment, and social ostracization.',
          para_ref: 19
        },
        {
          id: 'ap-3',
          counsel: 'Adv. Dr. Menaka Guruswamy',
          argument: 'LGBTQ+ citizens cannot be denied equal citizenship. Koushal\'s "miniscule fraction" rationale is antithetical to constitutional guarantees safeguarding minorities.',
          para_ref: 22
        }
      ],
      respondent_arguments:
        'The Union of India, represented by the Additional Solicitor General, chose not to oppose the decriminalization of consensual acts between adults in private and left the question of constitutional validity to the wisdom of the Court. However, religious and conservative intervenors (such as Apostolic Churches Alliance and Suresh Kumar Koushal) contended that Section 377 protects public health and traditional family morality, arguing that striking down the provision would open the floodgates to diseases and erode Indian cultural sanctity.',
      respondent_arguments_points: [
        {
          id: 'rp-1',
          counsel: 'Additional Solicitor General (Union of India)',
          argument: 'Left the question of constitutional validity of Section 377 IPC as applicable to consenting adults to the wisdom of the Court, requesting protection for non-consensual acts and minors.',
          para_ref: 24
        },
        {
          id: 'rp-2',
          counsel: 'Intervenors (Religious & Cultural Organizations)',
          argument: 'Argued that public health, prevention of HIV, and preserving sanctified societal norms warranted retaining Section 377 as a valid legislative restriction.',
          para_ref: 26
        }
      ],
      ratio_decidendi:
        'The Supreme Court unanimously held that Section 377 IPC is unconstitutional insofar as it penalizes consensual sexual activity between adults in private. The Court ruled that sexual orientation is an intrinsic element of liberty, privacy, and individual dignity protected under Article 21. Any discrimination on the ground of sexual orientation violates Articles 14 and 15. The Court emphatically affirmed that Constitutional Morality must supersede Social Morality. The previous judgment in Suresh Kumar Koushal was expressly overruled.',
      ratio_points: [
        {
          id: 'rp-r1',
          principle: 'Suresh Kumar Koushal v. Naz Foundation (2014) is formally overruled as legally untenable and contrary to constitutional jurisprudence.',
          para_ref: 28,
          landmark_ruling: true
        },
        {
          id: 'rp-r2',
          principle: 'Constitutional Morality, not popular or majoritarian morality, must guide constitutional adjudication. The protection of minority rights is the supreme duty of the Court.',
          para_ref: 30,
          landmark_ruling: true
        },
        {
          id: 'rp-r3',
          principle: 'Discrimination based on sexual orientation is an impermissible violation of Article 14 (Equality) and Article 15 (Prohibition of discrimination on sex).',
          para_ref: 32,
          landmark_ruling: true
        },
        {
          id: 'rp-r4',
          principle: 'Consensual intimacy between adults in private falls within the sacred core of the Right to Privacy and Personal Autonomy under Article 21.',
          para_ref: 34,
          landmark_ruling: true
        }
      ],
      final_verdict:
        'Section 377 of the Indian Penal Code is read down. Consensual sexual acts of adults (including LGBT persons) in private are decriminalized. Section 377 remains in force solely to penalize non-consensual sexual acts, carnal intercourse with minors, and bestiality. Justice Indu Malhotra noted that history owes an apology to members of this community for the delay in providing redress.',
      final_verdict_points: [
        {
          id: 'fv-1',
          order: 'Section 377 IPC is read down: Consensual adult sexual activity in private is declared non-criminal.',
          para_ref: 36
        },
        {
          id: 'fv-2',
          order: 'Section 377 continues to govern non-consensual sexual acts and acts against minors or animals without any dilution.',
          para_ref: 37
        },
        {
          id: 'fv-3',
          order: 'All executive and law enforcement agencies are directed to sensitize officials and ensure no further harassment of LGBTQ+ citizens.',
          para_ref: 38
        }
      ]
    },
    key_precedents_cited: [
      {
        case_title: 'Justice K.S. Puttaswamy v. Union of India',
        citation: '(2017) 10 SCC 1',
        context: 'Affirmed that privacy is a fundamental right encompassing sexual orientation and spatial privacy.',
        year: '2017',
        para_ref: 11
      },
      {
        case_title: 'National Legal Services Authority (NALSA) v. Union of India',
        citation: '(2014) 5 SCC 438',
        context: 'Recognized transgender rights and gender identity as an integral facet of self-determination under Articles 19 and 21.',
        year: '2014',
        para_ref: 14
      },
      {
        case_title: 'Suresh Kumar Koushal v. Naz Foundation',
        citation: '(2014) 1 SCC 1',
        context: 'The erroneous two-judge precedent that upheld Section 377; expressly overruled in this decision.',
        year: '2014',
        para_ref: 28
      },
      {
        case_title: 'Naz Foundation v. Govt. of NCT of Delhi',
        citation: '160 (2009) DLT 277',
        context: 'The landmark Delhi High Court verdict authored by Justice A.P. Shah reading down Section 377.',
        year: '2009',
        para_ref: 3
      },
      {
        case_title: 'Shayara Bano v. Union of India',
        citation: '(2017) 9 SCC 1',
        context: 'Established the test of "Manifest Arbitrariness" as a ground to strike down unconstitutional legislation under Article 14.',
        year: '2017',
        para_ref: 31
      }
    ],
    full_transcript: [
      {
        para_num: 1,
        speaker: 'Dipak Misra, C.J.I.',
        section_type: 'facts',
        text: 'Section 377 of the Indian Penal Code, 1860, a colonial relic introduced during the British Raj under Macaulay\'s penal code, stipulates: "Whoever voluntarily has carnal intercourse against the order of nature with any man, woman or animal, shall be punished with imprisonment for life, or with imprisonment of either description for a term which may extend to ten years, and shall also be liable to fine." The phrase "against the order of nature" has historically been applied to prosecute non-procreative consensual intimacy between adult citizens.',
        statutes_cited: ['IPC Section 377']
      },
      {
        para_num: 3,
        speaker: 'Dipak Misra, C.J.I.',
        section_type: 'facts',
        text: 'The genesis of the present constitutional challenge lies in the pioneering petition filed by Naz Foundation before the Delhi High Court. In its erudite judgment in 2009, the High Court held that Section 377 violated Articles 14, 15, and 21 of the Constitution insofar as it penalized consensual sexual acts between adults in private. The High Court eloquently reasoned that criminalization forced a segment of our society into hiding, exacerbating vulnerability and public health risks.',
        statutes_cited: ['Constitution Articles 14, 15, 21']
      },
      {
        para_num: 5,
        speaker: 'Dipak Misra, C.J.I.',
        section_type: 'facts',
        text: 'Regrettably, in Suresh Kumar Koushal v. Naz Foundation, a two-judge bench of this Court overturned the High Court\'s verdict. The bench in Koushal held that the LGBT community comprised merely a "miniscule fraction of the country\'s population" and that in over 150 years, less than two hundred persons had been prosecuted under Section 377. That observation fundamentally misunderstood the purpose of fundamental rights, which exist specifically to protect individuals and minority groups from majoritarian prejudices.',
        key_phrases: ['miniscule fraction', 'flawed reasoning']
      },
      {
        para_num: 7,
        speaker: 'Dipak Misra, C.J.I.',
        section_type: 'facts',
        text: 'The petitioners before us, including Navtej Singh Johar, an internationally acclaimed Bharatanatyam dancer, Ritu Dalmia, a renowned restaurateur, and Aman Nath, a celebrated conservationist and writer, have candidly laid bare the constant fear of prosecution and societal stigma under which they have had to live their daily lives. They invoke the extraordinary jurisdiction of this Court under Article 32 to assert their right to live with dignity and equal citizenship.',
        statutes_cited: ['Constitution Article 32']
      },
      {
        para_num: 8,
        speaker: 'R.F. Nariman, J.',
        section_type: 'issues',
        text: 'The first primary issue is whether Section 377 IPC creates an unreasonable and hostile classification in violation of Article 14 of the Constitution. If human sexual orientation is largely determined by genetic, biological, and psychological factors, criminalizing individuals for their involuntary identity constitutes the very epitome of arbitrariness.',
        statutes_cited: ['Constitution Article 14']
      },
      {
        para_num: 10,
        speaker: 'D.Y. Chandrachud, J.',
        section_type: 'issues',
        text: 'The second issue is whether the criminalization of consensual adult intimacy invades the core guarantee of personal autonomy under Article 21. Does the state have any legitimate penological interest in entering the private bedrooms of consenting adults? Can the criminal law be weaponized to mandate moral conformity in personal relationships?',
        statutes_cited: ['Constitution Article 21']
      },
      {
        para_num: 11,
        speaker: 'D.Y. Chandrachud, J.',
        section_type: 'analysis',
        text: 'In our nine-judge Constitution Bench judgment in Justice K.S. Puttaswamy v. Union of India (2017), this Court categorically recognized privacy as a fundamental, inalienable human right. Privacy includes at its core the preservation of personal intimacies, the sanctity of family life, marriage, procreation, the home, and sexual orientation. Puttaswamy rendered the survival of Koushal an intellectual impossibility.',
        statutes_cited: ['Article 21'],
        key_phrases: ['Right to Privacy', 'Spatial Privacy', 'Sexual Orientation']
      },
      {
        para_num: 12,
        speaker: 'Dipak Misra, C.J.I.',
        section_type: 'issues',
        text: 'The third issue is whether sexual orientation is protected under the freedom of expression enshrined in Article 19(1)(a). Expression is not limited to verbal speech; it encompasses bodily expression, gender presentation, and the freedom to choose one\'s companion without state-mandated terror.',
        statutes_cited: ['Constitution Article 19(1)(a)']
      },
      {
        para_num: 14,
        speaker: 'A.M. Khanwilkar, J.',
        section_type: 'analysis',
        text: 'In NALSA v. Union of India (2014), this Court recognized that gender identity and self-determination lie at the foundation of personal liberty. The state cannot compel a citizen to suppress their identity as a condition of being treated as a lawful subject under the penal laws.',
        statutes_cited: ['Constitution Articles 14, 19, 21']
      },
      {
        para_num: 15,
        speaker: 'Dipak Misra, C.J.I.',
        section_type: 'issues',
        text: 'The fundamental overarching question is the dichotomy between Constitutional Morality and Social Morality. When public sentiment or religious orthodoxy demands the suppression of a minority, which principle must this Court uphold as the sentinel on the qui vive?',
        key_phrases: ['Constitutional Morality', 'Social Morality']
      },
      {
        para_num: 17,
        speaker: 'Mukul Rohatgi (Sr. Adv. for Petitioners)',
        section_type: 'appellant_arguments',
        text: 'Learned Senior Advocate Mr. Mukul Rohatgi submitted that sexual orientation is as natural as left-handedness. One does not choose one\'s sexual orientation; it is innate. By threatening consenting adults with life imprisonment for giving expression to their innate human love, Section 377 violates the bedrock of human dignity and creates second-class citizens.',
        statutes_cited: ['IPC Section 377', 'Article 21']
      },
      {
        para_num: 19,
        speaker: 'Arvind Datar (Sr. Adv. for Petitioners)',
        section_type: 'appellant_arguments',
        text: 'Mr. Arvind Datar, learned Senior Advocate, demonstrated through documentary records that Section 377 functions as an instrument of blackmail. Even when formal convictions are few, the mere existence of the penal provision empowers corrupt officials and blackmailers to extort money and abuse vulnerable individuals under the threat of arrest.',
        statutes_cited: ['IPC Section 377']
      },
      {
        para_num: 22,
        speaker: 'Dr. Menaka Guruswamy (Adv. for Petitioners)',
        section_type: 'appellant_arguments',
        text: 'Dr. Menaka Guruswamy, appearing for petitioner academics and IIT alumni, forcefully argued that constitutional rights cannot be subjected to a headcount. The test applied in Koushal—that the minority is "miniscule"—is antithetical to the very concept of the Bill of Rights. Constitutional guarantees are meant precisely to protect the isolated and vulnerable from majoritarian coercion.',
        key_phrases: ['Equal Citizenship', 'Anti-Majoritarian principle']
      },
      {
        para_num: 24,
        speaker: 'Tushar Mehta (ASG for Union of India)',
        section_type: 'respondent_arguments',
        text: 'The learned Additional Solicitor General stated on affidavit that the Union of India leaves the question of the constitutional validity of Section 377 IPC, insofar as it applies to consenting adults in private, to the wisdom of this Court. The Union prayed that the provisions protecting minors, non-consensual acts, and animals remain intact and undisturbed.',
        statutes_cited: ['IPC Section 377']
      },
      {
        para_num: 26,
        speaker: 'Counsel for Intervenors',
        section_type: 'respondent_arguments',
        text: 'Learned counsel appearing for certain religious bodies argued that homosexuality is contrary to the moral fabric of Indian society, undermines the institution of marriage, and poses public health risks relating to sexually transmitted infections. They submitted that Parliament, as the representative organ of the people, is the appropriate forum to evaluate penal modifications.',
        key_phrases: ['Societal Morality', 'Legislative Prerogative']
      },
      {
        para_num: 28,
        speaker: 'Dipak Misra, C.J.I.',
        section_type: 'ratio',
        text: 'We hold that the view taken in Suresh Kumar Koushal v. Naz Foundation is unsustainable and contrary to constitutional principles. The reasoning that a constitutional right depends on the numerical strength of the claimants is fundamentally erroneous. A minuscule fraction of a population is entitled to the same zenith of constitutional protection as the majority. Koushal is hereby expressly overruled.',
        key_phrases: ['Overruling of Koushal', 'Minority Protection']
      },
      {
        para_num: 30,
        speaker: 'Dipak Misra, C.J.I.',
        section_type: 'ratio',
        text: 'Constitutional morality must triumph over the impulses of popular sentiment or majoritarian morality. The Court cannot allow societal prejudice to trample upon the guaranteed rights of any individual. Constitutional morality requires that the values of liberty, equality, and fraternity be given living reality, not subordinated to prevailing social orthodoxy.',
        key_phrases: ['Constitutional Morality', 'Fraternity', 'Liberty']
      },
      {
        para_num: 31,
        speaker: 'R.F. Nariman, J.',
        section_type: 'ratio',
        text: 'In Shayara Bano v. Union of India, this Court reiterated that a statutory provision can be struck down if it is manifestly arbitrary. Section 377, by criminalizing consensual sexual acts between adults in private, lacks any intelligible differentia with a legitimate state objective. It targets an immutable attribute of personhood and is manifestly arbitrary and unconstitutional under Article 14.',
        statutes_cited: ['Constitution Article 14', 'IPC Section 377']
      },
      {
        para_num: 32,
        speaker: 'D.Y. Chandrachud, J.',
        section_type: 'ratio',
        text: 'The word "sex" in Article 15(1) is not confined to biological sex alone; it includes sexual orientation. Discrimination on the ground of sexual orientation is inherently discrimination on the ground of sex, because it imposes stereotypical role expectations on how men and women must conduct their romantic and intimate lives.',
        statutes_cited: ['Constitution Article 15(1)']
      },
      {
        para_num: 34,
        speaker: 'D.Y. Chandrachud, J.',
        section_type: 'ratio',
        text: 'The right to privacy protects intimacy, identity, and the choice of partners. Autonomy over one\'s body and the freedom to love is integral to Article 21. Section 377, by casting a criminal shadow over the bedrooms of citizens, infringes the foundational right to live with dignity and peace.',
        statutes_cited: ['Constitution Article 21']
      },
      {
        para_num: 36,
        speaker: 'Dipak Misra, C.J.I.',
        section_type: 'verdict',
        text: 'In view of the aforesaid findings, Section 377 of the Indian Penal Code is read down. Insofar as Section 377 criminalizes consensual sexual acts of adults in private, whether of the same sex or different sexes, it is declared unconstitutional and violative of Articles 14, 15, 19, and 21 of the Constitution of India.',
        statutes_cited: ['IPC Section 377', 'Articles 14, 15, 19, 21']
      },
      {
        para_num: 37,
        speaker: 'Dipak Misra, C.J.I.',
        section_type: 'verdict',
        text: 'We clarify that Section 377 IPC shall remain fully enforceable with respect to non-consensual carnal acts committed on any person, as well as carnal acts committed upon minors and animals. The penal shield protecting vulnerable persons from assault remains untouched.',
        statutes_cited: ['IPC Section 377']
      },
      {
        para_num: 38,
        speaker: 'Indu Malhotra, J.',
        section_type: 'verdict',
        text: 'History owes an apology to the members of this community and their families, for the delay in providing redress for the ignominy and ostracism that they have suffered through the centuries. The members of this community were compelled to live a life full of fear of reprisal and persecution on account of the ignorance of the majority. The writ petitions are accordingly allowed in the aforesaid terms.',
        key_phrases: ['Apology of History', 'Petitions Allowed']
      }
    ]
  },
  {
    id: 'puttaswamy-privacy',
    metadata: {
      case_name: 'Justice K.S. Puttaswamy (Retd.) & Anr. v. Union of India & Ors.',
      citation_number: '(2017) 10 SCC 1 | AIR 2017 SC 4161',
      court: 'Supreme Court of India (9-Judge Constitution Bench)',
      judgment_date: '2017-08-24',
      bench: 'J.S. Khehar, C.J.I., J. Chelameswar, S.A. Bobde, R.K. Agrawal, R.F. Nariman, A.M. Sapre, D.Y. Chandrachud, Sanjay Kishan Kaul & S. Abdul Nazeer, JJ.',
      acts_and_sections: [
        'Constitution of India Article 21',
        'Constitution of India Article 14',
        'Constitution of India Article 19',
        'Aadhaar Act 2016',
        'Information Technology Act 2000'
      ]
    },
    summary: {
      factual_matrix:
        'A 9-judge Constitution Bench of the Supreme Court was convened to authoritatively determine whether the Right to Privacy is a fundamental right guaranteed under Part III of the Constitution of India. The question arose during challenges to the constitutional validity of the Aadhaar scheme, where the Union Government and state respondents contended that privacy was not a fundamental right, relying on old larger-bench rulings in M.P. Sharma (1954, 8 judges) and Kharak Singh (1962, 6 judges). Former High Court Judge K.S. Puttaswamy along with civil rights advocates challenged mandatory biometric collection.',
      factual_matrix_points: [
        {
          id: 'p-fm-1',
          text: 'The Union Government argued that the Constitution makers deliberately omitted privacy as a distinct fundamental right.',
          para_ref: 1
        },
        {
          id: 'p-fm-2',
          text: 'The State relied upon M.P. Sharma v. Satish Chandra (1954) and Kharak Singh v. State of U.P. (1962) to argue that privacy was merely a common law right.',
          para_ref: 3
        },
        {
          id: 'p-fm-3',
          text: 'Petitioner Justice K.S. Puttaswamy challenged the mandatory collection of iris and fingerprint biometrics under Aadhaar without legislative backing.',
          para_ref: 5
        }
      ],
      framed_issues: [
        'Whether the Right to Privacy is a fundamental right guaranteed under the Constitution of India.',
        'Whether the earlier judgments of larger benches in M.P. Sharma (8 judges) and Kharak Singh (6 judges) correctly held that there is no fundamental right to privacy.',
        'What is the standard of judicial review and proportional scrutiny applicable when the State curtails privacy.'
      ],
      framed_issues_detailed: [
        {
          id: 'p-fi-1',
          issue: 'Fundamental Status of Privacy: Is privacy an inalienable natural right recognized under the golden triangle of Articles 14, 19, and 21?',
          para_ref: 7,
          statute: 'Article 21'
        },
        {
          id: 'p-fi-2',
          issue: 'Correctness of M.P. Sharma & Kharak Singh: Did the prior larger benches rule on modern informational and spatial privacy?',
          para_ref: 9,
          statute: 'Precedent Overruling'
        },
        {
          id: 'p-fi-3',
          issue: 'Three-Fold Proportionality Test: What are the constitutional preconditions for permissible state encroachment on citizen data and bodily autonomy?',
          para_ref: 14,
          statute: 'Article 21 Scrutiny'
        }
      ],
      appellant_arguments:
        'Senior Advocates Gopal Subramanium, Soli Sorabjee, Shyam Divan, and Arvind Datar argued that privacy is the foundation of human liberty. Without privacy, neither freedom of speech (Art 19) nor liberty and dignity (Art 21) can be exercised. They contended that M.P. Sharma was strictly confined to search warrants and self-incrimination under Art 20(3), and Kharak Singh was based on the outdated A.K. Gopalan doctrine that fundamental rights operate in isolated silos.',
      appellant_arguments_points: [
        {
          id: 'p-ap-1',
          counsel: 'Senior Adv. Gopal Subramanium',
          argument: 'Privacy is an unarticulated premise of all fundamental rights. It is an inalienable natural right inherent to human dignity.',
          para_ref: 11
        },
        {
          id: 'p-ap-2',
          counsel: 'Senior Adv. Shyam Divan',
          argument: 'Bodily integrity and informational self-determination belong exclusively to the individual, not the sovereign state.',
          para_ref: 13
        }
      ],
      respondent_arguments:
        'Attorney General K.K. Venugopal and Additional Solicitor General Tushar Mehta argued for the State that privacy is an amorphous, elitist concept that cannot be elevated to a fundamental right, especially when pitted against the socio-economic welfare rights of millions living below the poverty line.',
      respondent_arguments_points: [
        {
          id: 'p-rp-1',
          counsel: 'Attorney General K.K. Venugopal',
          argument: 'Privacy cannot be an absolute fundamental right in a developing nation where social welfare distribution and identity verification are paramount.',
          para_ref: 15
        }
      ],
      ratio_decidendi:
        'The 9-judge bench unanimously held that the Right to Privacy is a fundamental right protected as an intrinsic part of the right to life and personal liberty under Article 21 and as part of the freedoms guaranteed by Part III of the Constitution. M.P. Sharma was overruled to the extent it held privacy was not protected. Kharak Singh was overruled to the extent it held privacy was not a guaranteed right under Article 21. Any state encroachment on privacy must satisfy the three-fold test: (i) Legitimate Law, (ii) Legitimate State Aim, and (iii) Proportionality.',
      ratio_points: [
        {
          id: 'p-r1',
          principle: 'Right to Privacy is declared an inalienable fundamental right under Article 21, breathing life into human dignity and autonomy.',
          para_ref: 18,
          landmark_ruling: true
        },
        {
          id: 'p-r2',
          principle: 'Three-Fold Proportionality Test established: Legality, Legitimate State Aim, and Proportionality (suitability and least restrictive means).',
          para_ref: 21,
          landmark_ruling: true
        },
        {
          id: 'p-r3',
          principle: 'M.P. Sharma and Kharak Singh overruled regarding denial of fundamental privacy protections.',
          para_ref: 24,
          landmark_ruling: true
        }
      ],
      final_verdict:
        'The reference was answered in the affirmative: Privacy is held to be a fundamental constitutional right. The matter was remitted to the regular bench to adjudicate the specific validity of the Aadhaar Act.',
      final_verdict_points: [
        {
          id: 'p-fv-1',
          order: 'Unanimous 9-0 declaration that Privacy is a constitutionally guaranteed Fundamental Right under Part III.',
          para_ref: 26
        },
        {
          id: 'p-fv-2',
          order: 'Data protection and informational privacy recognized as essential obligations of modern constitutional states.',
          para_ref: 28
        }
      ]
    },
    key_precedents_cited: [
      {
        case_title: 'Maneka Gandhi v. Union of India',
        citation: '(1978) 1 SCC 248',
        context: 'Interlinked Articles 14, 19, and 21, establishing that state procedure must be just, fair, and reasonable.',
        year: '1978',
        para_ref: 8
      },
      {
        case_title: 'M.P. Sharma v. Satish Chandra',
        citation: '1954 SCR 1077',
        context: '8-judge bench decision on search and seizure; overruled on privacy by this 9-judge bench.',
        year: '1954',
        para_ref: 24
      },
      {
        case_title: 'Kharak Singh v. State of U.P.',
        citation: '(1964) 1 SCR 332',
        context: '6-judge bench decision on domiciliary visits; overruled regarding denial of privacy under Art 21.',
        year: '1962',
        para_ref: 25
      }
    ],
    full_transcript: [
      {
        para_num: 1,
        speaker: 'J.S. Khehar, C.J.I.',
        section_type: 'facts',
        text: 'The solemn question referred to this nine-judge Constitution Bench is whether the Right to Privacy is a fundamental right under the Constitution of India. The Union of India and respondent states have strongly submitted that the framers of the Constitution deliberately excluded privacy from Part III, and that this Court in two earlier decisions of larger benches has already concluded that privacy is not a fundamental right.',
        statutes_cited: ['Constitution Article 21']
      },
      {
        para_num: 3,
        speaker: 'J.S. Khehar, C.J.I.',
        section_type: 'facts',
        text: 'Specifically, the respondents place heavy reliance on the eight-judge bench judgment in M.P. Sharma v. Satish Chandra (1954) and the six-judge bench judgment in Kharak Singh v. State of Uttar Pradesh (1962). The Attorney General argued that as long as these larger bench decisions hold the field, smaller benches of two or three judges could not have read privacy into Article 21.',
        key_phrases: ['M.P. Sharma', 'Kharak Singh', 'Precedent Hierarchy']
      },
      {
        para_num: 5,
        speaker: 'D.Y. Chandrachud, J.',
        section_type: 'facts',
        text: 'The petitioners, spearheaded by retired High Court Judge K.S. Puttaswamy, have challenged the Aadhaar program, which mandates the biometric collection of fingerprints and iris scans as a condition precedent for accessing civic entitlements. The petitioners contend that biometric data belongs exclusively to the individual, and state mass-surveillance infringes upon bodily integrity and informational self-determination.',
        statutes_cited: ['Aadhaar Act']
      },
      {
        para_num: 7,
        speaker: 'D.Y. Chandrachud, J.',
        section_type: 'issues',
        text: 'The core issue is whether privacy is an innate, natural right that precedes the state, or whether it is a mere statutory concession that can be granted or revoked at legislative whim. Does Article 21\'s guarantee of "personal liberty" and "dignity" encompass the sanctity of private life?',
        statutes_cited: ['Constitution Article 21']
      },
      {
        para_num: 8,
        speaker: 'R.F. Nariman, J.',
        section_type: 'analysis',
        text: 'Ever since the seminal decision in Maneka Gandhi v. Union of India (1978), the old silos doctrine of A.K. Gopalan has been discarded. Part III is an organic, interconnected whole. An infringement of personal liberty under Article 21 must pass muster under Article 14\'s prohibition against arbitrariness and Article 19\'s reasonableness tests.',
        statutes_cited: ['Constitution Articles 14, 19, 21']
      },
      {
        para_num: 11,
        speaker: 'Gopal Subramanium (Sr. Adv. for Petitioners)',
        section_type: 'appellant_arguments',
        text: 'Learned Senior Advocate Mr. Gopal Subramanium submitted that privacy is not a gift from the sovereign. It is an unarticulated core of the human personality. Liberty cannot exist without an inner sanctum where an individual is free from state surveillance, scrutiny, and judgment.',
        key_phrases: ['Inalienable Right', 'Inner Sanctum']
      },
      {
        para_num: 13,
        speaker: 'Shyam Divan (Sr. Adv. for Petitioners)',
        section_type: 'appellant_arguments',
        text: 'Mr. Shyam Divan emphasized the critical distinction between informational privacy, spatial privacy, and bodily autonomy. He argued that forcing citizens to barter their biometric coordinates for state entitlements reduces free citizens to barcode subjects.',
        key_phrases: ['Informational Self-Determination', 'Biometrics']
      },
      {
        para_num: 14,
        speaker: 'D.Y. Chandrachud, J.',
        section_type: 'issues',
        text: 'The second issue is formulating the exact test of judicial review. When the state claims a legitimate security or welfare interest, how must this Court balance sovereign needs against individual privacy? We must define the contours of proportional scrutiny.',
        key_phrases: ['Proportionality', 'Judicial Review']
      },
      {
        para_num: 15,
        speaker: 'K.K. Venugopal (Attorney General for India)',
        section_type: 'respondent_arguments',
        text: 'The learned Attorney General submitted that in a developing country where hundreds of millions lack basic food, shelter, and healthcare, socio-economic rights must take precedence over an abstract and elitist claim to privacy. The state requires digital identity verification to prevent leakages and ensure subsidies reach genuine beneficiaries.',
        key_phrases: ['Welfare State', 'Socio-Economic Rights']
      },
      {
        para_num: 18,
        speaker: 'D.Y. Chandrachud, J.',
        section_type: 'ratio',
        text: 'We emphatically reject the submission that privacy is an elitist luxury. Privacy is as essential to the impoverished citizen in a jhuggi as it is to the wealthy in a mansion. Privacy protects the human soul from unwarranted intrusion. We declare that the Right to Privacy is a protected fundamental right under Article 21.',
        statutes_cited: ['Constitution Article 21'],
        key_phrases: ['Fundamental Right Declared', 'Universal Right']
      },
      {
        para_num: 21,
        speaker: 'D.Y. Chandrachud, J.',
        section_type: 'ratio',
        text: 'Any invasion of privacy by the State must satisfy three stringent requirements: First, legality: there must be a valid law authorizing the action. Second, legitimate aim: the law must serve a legitimate state goal. Third, proportionality: the measure adopted must have a rational nexus to the objective and must be the least intrusive means available.',
        key_phrases: ['Three-Fold Proportionality Test', 'Legality', 'Legitimate Aim']
      },
      {
        para_num: 24,
        speaker: 'J.S. Khehar, C.J.I.',
        section_type: 'ratio',
        text: 'The decision in M.P. Sharma v. Satish Chandra, to the extent that it holds that privacy is not a fundamental right, is hereby expressly overruled. M.P. Sharma dealt with search warrants and self-incrimination under Article 20(3), and cannot be read as an authority for the proposition that privacy has no constitutional foundation.',
        key_phrases: ['M.P. Sharma Overruled']
      },
      {
        para_num: 25,
        speaker: 'R.F. Nariman, J.',
        section_type: 'ratio',
        text: 'Similarly, the majority judgment in Kharak Singh v. State of Uttar Pradesh, insofar as it held that Article 21 does not include privacy, is overruled. The dissenting opinion of Subba Rao, J., in Kharak Singh correctly recognized that personal liberty protects the citizen from unauthorized intrusions into their private life.',
        key_phrases: ['Kharak Singh Overruled', 'Subba Rao Dissent Upheld']
      },
      {
        para_num: 26,
        speaker: 'J.S. Khehar, C.J.I.',
        section_type: 'verdict',
        text: 'The unanimous verdict of all nine judges is that the Right to Privacy is an integral facet of Article 21 and the liberties guaranteed under Part III of the Constitution. The reference is answered in the affirmative.',
        statutes_cited: ['Constitution Article 21']
      },
      {
        para_num: 28,
        speaker: 'Sanjay Kishan Kaul, J.',
        section_type: 'verdict',
        text: 'We emphasize the urgent need for a robust data protection statutory regime. The state must regulate both governmental and non-governmental entities to prevent surveillance capitalism and unauthorized profiling. The individual must remain the master of their personal data.',
        key_phrases: ['Data Protection Regime', 'Informational Privacy']
      }
    ]
  },
  {
    id: 'shreya-singhal-66a',
    metadata: {
      case_name: 'Shreya Singhal v. Union of India',
      citation_number: '(2015) 5 SCC 1 | AIR 2015 SC 1523',
      court: 'Supreme Court of India (Division Bench)',
      judgment_date: '2015-03-24',
      bench: 'J. Chelameswar & Rohinton Fali Nariman, JJ.',
      acts_and_sections: [
        'Information Technology Act Section 66A',
        'Constitution of India Article 19(1)(a)',
        'Constitution of India Article 19(2)',
        'Constitution of India Article 14'
      ]
    },
    summary: {
      factual_matrix:
        'Law student Shreya Singhal and several free speech advocates challenged Section 66A of the Information Technology Act, 2000, after two young women in Palghar, Maharashtra were arrested under the section for posting and liking a Facebook post questioning the total city shutdown following a politician\'s demise. Section 66A prescribed up to 3 years imprisonment for sending information through a computer resource that is "grossly offensive" or has "menacing character".',
      factual_matrix_points: [
        {
          id: 'ss-fm-1',
          text: 'Two women in Palghar were arrested for harmless social media posts, highlighting the rampant abuse of Section 66A IT Act by police.',
          para_ref: 1
        },
        {
          id: 'ss-fm-2',
          text: 'Section 66A penalized sending messages that were deemed "grossly offensive", "menacing", or causing "annoyance" without clear definitions.',
          para_ref: 2
        }
      ],
      framed_issues: [
        'Whether Section 66A IT Act is unconstitutionally vague and overbroad, violating freedom of speech under Article 19(1)(a).',
        'Whether the expressions "grossly offensive" or "annoyance" fall within the permissible grounds of reasonable restriction under Article 19(2).'
      ],
      framed_issues_detailed: [
        {
          id: 'ss-fi-1',
          issue: 'Void for Vagueness & Overbreadth: Can criminal liability attach to ambiguous terms like "annoyance" or "inconvenience"?',
          para_ref: 4,
          statute: 'Article 19(1)(a)'
        },
        {
          id: 'ss-fi-2',
          issue: 'Clear Nexus to Article 19(2) Exceptions: Does Section 66A protect public order or incite criminal offences?',
          para_ref: 6,
          statute: 'Article 19(2)'
        }
      ],
      appellant_arguments:
        'Petitioners argued that Section 66A created a massive chilling effect on free speech. The section failed to distinguish between advocacy and incitement. Vague terms left enforcement entirely to the arbitrary discretion of police officers.',
      appellant_arguments_points: [
        {
          id: 'ss-ap-1',
          counsel: 'Senior Adv. Soli Sorabjee',
          argument: 'Advocacy of an unpopular opinion cannot be conflated with incitement to violence. Section 66A catches completely benign and lawful speech.',
          para_ref: 8
        }
      ],
      respondent_arguments:
        'The Union of India argued that internet communication has a uniquely viral, amplifying reach and requires special deterrent regulation to maintain public tranquility.',
      respondent_arguments_points: [
        {
          id: 'ss-rp-1',
          counsel: 'Additional Solicitor General',
          argument: 'The internet is distinct from print media; an offensive post can reach millions in seconds. The section was necessary to preserve digital decorum.',
          para_ref: 10
        }
      ],
      ratio_decidendi:
        'Section 66A of the IT Act was declared unconstitutional in its entirety. The Court differentiated between discussion, advocacy, and incitement. Only incitement leading to imminent lawless action can be restricted under Article 19(2). Section 66A was hopelessly vague and cast its net so wide that innocent speech was swept within its draconian ambit.',
      ratio_points: [
        {
          id: 'ss-r1',
          principle: 'Discussion and advocacy are the lifeblood of democracy; only speech that amounts to incitement can be penalized under Article 19(2).',
          para_ref: 12,
          landmark_ruling: true
        },
        {
          id: 'ss-r2',
          principle: 'Doctrine of Vagueness: A criminal law must define offences with sufficient clarity so that a citizen knows what is prohibited.',
          para_ref: 14,
          landmark_ruling: true
        }
      ],
      final_verdict:
        'Section 66A of the Information Technology Act, 2000 is struck down in its entirety as violative of Article 19(1)(a) of the Constitution.',
      final_verdict_points: [
        {
          id: 'ss-fv-1',
          order: 'Section 66A IT Act is struck down as void and unconstitutional ab initio.',
          para_ref: 16
        }
      ]
    },
    key_precedents_cited: [
      {
        case_title: 'Kameshwar Singh v. State of Bihar',
        citation: 'AIR 1952 SC 252',
        context: 'Established the boundaries of reasonable restriction under Article 19(2).',
        year: '1952',
        para_ref: 5
      },
      {
        case_title: 'Brandenburg v. Ohio',
        citation: '395 U.S. 444 (1969)',
        context: 'U.S. Supreme Court doctrine adopted regarding incitement of imminent lawless action.',
        year: '1969',
        para_ref: 12
      }
    ],
    full_transcript: [
      {
        para_num: 1,
        speaker: 'R.F. Nariman, J.',
        section_type: 'facts',
        text: 'This writ petition under Article 32 challenges the constitutional validity of Section 66A of the Information Technology Act, 2000. The catalyst for this litigation was the wrongful arrest of two college girls in Palghar who simply questioned why Mumbai was brought to a standstill following the demise of a political figure. The arrests triggered nationwide outrage regarding the weaponization of vague statutory provisions to crush digital expression.',
        statutes_cited: ['IT Act Section 66A']
      },
      {
        para_num: 2,
        speaker: 'R.F. Nariman, J.',
        section_type: 'facts',
        text: 'Section 66A criminalizes sending by means of a computer resource any information that is grossly offensive or has menacing character, or information known to be false for the purpose of causing annoyance, inconvenience, danger, or insult. The punishment extends up to three years imprisonment with fine.',
        statutes_cited: ['IT Act Section 66A']
      },
      {
        para_num: 4,
        speaker: 'R.F. Nariman, J.',
        section_type: 'issues',
        text: 'The fundamental issue before us is whether Section 66A satisfies the test of permissible restriction under Article 19(2). Does the statute define with reasonable precision what constitutes criminal conduct, or does it leave an open season for subjective executive policing?',
        statutes_cited: ['Article 19(1)(a)', 'Article 19(2)']
      },
      {
        para_num: 6,
        speaker: 'R.F. Nariman, J.',
        section_type: 'issues',
        text: 'Can the terms "annoyance", "inconvenience", or "grossly offensive" be squared with the eight exhaustively enumerated heads under Article 19(2)—namely, sovereignty of India, security of the State, friendly relations with foreign States, public order, decency or morality, contempt of court, defamation, or incitement to an offence?',
        statutes_cited: ['Article 19(2)']
      },
      {
        para_num: 8,
        speaker: 'Soli Sorabjee (Sr. Adv. for Petitioners)',
        section_type: 'appellant_arguments',
        text: 'Learned Senior Advocate Mr. Soli Sorabjee submitted that there are three fundamental concepts in freedom of speech: discussion, advocacy, and incitement. Mere discussion or even vehement advocacy of an unpopular cause does not endanger public order. Incitement is the only threshold where the penal law can step in. Section 66A obliterates this distinction.',
        key_phrases: ['Discussion vs Advocacy vs Incitement']
      },
      {
        para_num: 10,
        speaker: 'Additional Solicitor General',
        section_type: 'respondent_arguments',
        text: 'The Union of India defended the legislation, arguing that the internet is an extraordinary medium that amplifies defamatory and scandalous matter instantaneously. The State undertook to administer the provision through administrative guidelines to prevent harassment.',
        key_phrases: ['Internet Exceptionalism', 'Executive Guidelines']
      },
      {
        para_num: 12,
        speaker: 'R.F. Nariman, J.',
        section_type: 'ratio',
        text: 'We hold that freedom of speech and expression is the very foundation of democratic governance. The line between advocacy and incitement is fundamental. Mere discussion or advocacy of an unpopular or offensive thought cannot be made a criminal offence. Article 19(2) permits restriction only when speech reaches the threshold of incitement to imminent lawless action.',
        key_phrases: ['Incitement Standard', 'Democratic Foundation']
      },
      {
        para_num: 14,
        speaker: 'R.F. Nariman, J.',
        section_type: 'ratio',
        text: 'Section 66A is void for vagueness and overbreadth. What is annoying or offensive to one person may be an everyday political observation to another. An unconstitutionally vague criminal law creates a chilling effect on legitimate speech, freezing citizens in fear of criminal prosecution.',
        key_phrases: ['Void for Vagueness', 'Chilling Effect']
      },
      {
        para_num: 16,
        speaker: 'R.F. Nariman, J.',
        section_type: 'verdict',
        text: 'In the result, Section 66A of the Information Technology Act, 2000 is struck down in its entirety as unconstitutional and violative of Article 19(1)(a) of the Constitution. All pending prosecutions under Section 66A are rendered void.',
        statutes_cited: ['IT Act Section 66A', 'Article 19(1)(a)']
      }
    ]
  }
];
