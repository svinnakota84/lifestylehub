export interface LegalSection {
  id: string;
  title: string;
  badge: string;
  summary: string;
  content: string[];
}

export const LEGAL_SHIELD_SECTIONS: LegalSection[] = [
  {
    id: 'medical-disclaimer',
    title: 'Medical, Healthcare & Nutritional Disclaimer',
    badge: 'Critical Medical Notice',
    summary: 'LifestyleHub provides non-clinical educational and wellness guidance only. It is not medical advice, diagnosis, or clinical therapy.',
    content: [
      'LifestyleHub (the "Company", "we", "us", or "our") provides digital wellness, meal preparation concepts, cardiovascular exercise guidelines, and aesthetic styling education for general informational and educational purposes only.',
      'THE CONTENT, RECIPES, CALORIC TARGETS, NUTRITIONAL BREAKDOWNS, AND EXERCISE PROTOCOLS PROVIDED BY LIFESTYLEHUB ARE NOT INTENDED AS MEDICAL ADVICE, CLINICAL DIAGNOSIS, MEDICAL NUTRITION THERAPY, OR TREATMENT OF ANY MEDICAL CONDITION OR DISEASE.',
      'No physician-patient, dietitian-client, or other healthcare professional relationship is created through your use of this application or participation in any membership tier.',
      'YOU MUST CONSULT A LICENSED PHYSICIAN OR QUALIFIED MEDICAL PRACTITIONER PRIOR TO BEGINNING ANY NEW DIET, EXERCISE PROGRAM, FASTING ROUTINE, CALORIE RESTRICTION, OR LIFESTYLE MODIFICATION. This is especially vital if you are pregnant, nursing, diabetic, hypertensive, taking prescription pharmaceuticals, or have a pre-existing cardiovascular, metabolic, or orthopedic condition.',
      'Never disregard, delay, or avoid seeking professional medical advice because of something you read or accessed on LifestyleHub.',
    ],
  },
  {
    id: 'exercise-waiver',
    title: 'Cardiovascular & Physical Activity Liability Release & Assumption of Risk',
    badge: 'Physical Release (PAR-Q)',
    summary: 'You voluntarily assume all inherent risks associated with physical cardio exercises and release the company from any liability or personal injury claims.',
    content: [
      'Cardiovascular exercise, walking intervals, Tabata, bodyweight drills, and physical training carry inherent physiological risks, including but not limited to musculoskeletal strains, sprains, joint fatigue, cardiovascular events, dizziness, falls, and in rare cases, catastrophic injury or death.',
      'By engaging in any exercise or workout session featured within LifestyleHub, you explicitly confirm that: (1) You have undergone a medical evaluation and have received clearance from your physician for moderate-to-vigorous physical activity; (2) You do not suffer from unmanaged cardiovascular disease, shortness of breath at rest, chest pain, joint disorders, or balance impediments (in compliance with PAR-Q standards); and (3) You participate entirely at your own voluntary election.',
      'EXPRESS ASSUMPTION OF RISK: You voluntarily and knowingly assume full responsibility for any and all risks of loss, property damage, bodily injury, illness, or death arising out of or related to your participation.',
      'FULL RELEASE OF LIABILITY: To the maximum extent permitted by applicable law, you hereby irrevocably and unconditionally release, waive, acquit, and forever discharge LifestyleHub, its founders, officers, directors, employees, contractors, licensors, and affiliates from any and all past, present, or future claims, demands, causes of action, liabilities, damages, or costs (including legal fees) arising from personal injury or illness sustained in connection with workouts or programs.',
    ],
  },
  {
    id: 'allergy-disclaimer',
    title: 'Food Allergens, Cooking Safety & Dietary Intolerance Disclaimer',
    badge: 'Food Safety Shield',
    summary: 'You are solely responsible for ingredient verification, cross-contamination prevention, and safe culinary handling.',
    content: [
      'LifestyleHub recipe blueprints and meal replacement recommendations may reference common allergens, including dairy, eggs, tree nuts, peanuts, soy, wheat/gluten, fish, and shellfish.',
      'It is your sole, non-delegable duty to inspect all raw ingredients, packaging labels, and cross-contact advisories prior to preparation or ingestion. LifestyleHub does not manufacture, package, or distribute food items and cannot guarantee absence of allergens.',
      'You are exclusively responsible for proper food handling, refrigeration, internal cooking temperatures (e.g., verifying safe poultry and seafood internal temperatures using a food thermometer), and sanitary kitchen hygiene.',
    ],
  },
  {
    id: 'binding-arbitration',
    title: 'Mandatory Binding Individual Arbitration & Class Action Waiver',
    badge: 'Dispute Immunity Shield',
    summary: 'All claims must be resolved individually through binding arbitration, prohibiting class actions, jury trials, and collective lawsuits.',
    content: [
      'PLEASE READ THIS CLAUSE CAREFULLY. IT DIRECTLY AFFECTS YOUR LEGAL RIGHTS AND GOVERNS HOW ANY DISPUTES BETWEEN YOU AND LIFESTYLEHUB WILL BE ADJUDICATED.',
      'MANDATORY ARBITRATION: Any controversy, dispute, or claim arising out of or relating to your subscription, access to the platform, content, payments, or these Terms shall be resolved exclusively through final and binding individual arbitration administered by the American Arbitration Association (AAA) under its Consumer Arbitration Rules.',
      'CLASS ACTION WAIVER: YOU AND LIFESTYLEHUB AGREE THAT EACH PARTY MAY BRING CLAIMS AGAINST THE OTHER ONLY IN AN INDIVIDUAL CAPACITY, AND NOT AS A PLAINTIFF, CLASS MEMBER, OR PRIVATE ATTORNEY GENERAL IN ANY PURPORTED CLASS, REPRESENTATIVE, OR COLLECTIVE PROCEEDING.',
      'WAIVER OF JURY TRIAL: You knowingly, voluntarily, and intentionally waive any right you may have to a trial by jury in any lawsuit, proceeding, or litigation.',
    ],
  },
  {
    id: 'limitation-of-liability',
    title: 'Limitation of Liability & Total Damages Cap',
    badge: 'Financial Protection Shield',
    summary: 'The maximum recoverable damages under any legal theory are strictly capped at the amount paid by you in the preceding 90 days.',
    content: [
      'TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL LIFESTYLEHUB, ITS AFFILIATES, OFFICERS, AGENTS, OR SUPPLIERS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, PUNITIVE, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING LOSS OF PROFITS, DATA LOSS, PAIN AND SUFFERING, OR EMOTIONAL DISTRESS).',
      'THE AGGREGATE LIABILITY OF LIFESTYLEHUB FOR ALL CLAIMS ARISING OUT OF OR IN CONNECTION WITH THE APPLICATION OR THESE TERMS SHALL NOT EXCEED THE TOTAL FEES ACTUALLY PAID BY YOU TO LIFESTYLEHUB DURING THE THREE (3) MONTHS IMMEDIATELY PRECEDING THE INCIDENT GIVING RISE TO LIABILITY, OR FIFTY US DOLLARS ($50.00), WHICHEVER IS GREATER.',
    ],
  },
  {
    id: 'cancellation-policy',
    title: 'Subscription Auto-Renewal, Cancellation & Refund Policy',
    badge: 'FTC / ROSCA Protection',
    summary: 'Transparent recurring billing, self-service 1-tap cancellation, and chargeback dispute mitigation.',
    content: [
      'LifestyleHub subscriptions (Essentials, Plus, Coach) automatically renew on a monthly billing cycle on the same calendar day of each month until canceled.',
      'You may cancel your recurring subscription at any time without penalty via your in-app Membership Dashboard or by emailing support. Cancellation stops future recurring charges while retaining your access until the end of your current prepaid billing cycle.',
      'All purchases are final and non-refundable once content has been accessed or downloaded, except where mandated by local consumer statutes. By subscribing, you agree not to initiate unauthorized fraudulent chargebacks with your issuing card provider without first contacting LifestyleHub customer care.',
    ],
  },
];
