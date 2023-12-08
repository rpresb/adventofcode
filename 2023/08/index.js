module.exports = () => {
  const lines = data.trim().split("\n").filter(Boolean);
  const command = lines[0].split("");
  const instruction = lines.slice(1).reduce((accum, line) => {
    const [key, map] = line.split("=");

    return {
      ...accum,
      [key.trim()]: map
        .replace("(", "")
        .replace(")", "")
        .split(",")
        .map((i) => i.trim()),
    };
  }, {});

  console.log("Part 1 ===> ", part1(command, instruction));
  console.log("Part 2 ===> ", part2(command, instruction));
};

function part1(command, instruction) {
  return findExpected("ZZZ", "AAA", command, instruction, 0);
}

const lcm = (...arr) => {
  const gcd = (x, y) => (!y ? x : gcd(y, x % y));
  const _lcm = (x, y) => (x * y) / gcd(x, y);
  return [...arr].reduce((a, b) => _lcm(a, b));
};

function part2(command, instruction) {
  const start = Object.keys(instruction).filter(
    (key) => key.charAt(key.length - 1) === "A"
  );

  const f = lazy((current, count) => {
    const position =
      instruction[current][command[count % command.length] === "L" ? 0 : 1];

    if (String(position).endsWith("Z")) {
      return count + 1;
    }

    return f(position, count + 1);
  });

  const lengths = start.map((x) => {
    return trampoline(f(x, 0));
  });

  return lcm(...lengths);
}

const trampoline = (x) => {
  while (typeof x == "function") x = x();
  return x;
};

const lazy =
  (f) =>
  (...args) =>
  () =>
    f(...args);

function findExpected(expected, current, command, instruction, count) {
  if (!instruction[current]) {
    return;
  }
  const f = lazy((expected, current, command, instruction, count) => {
    const found =
      instruction[current][command[count % command.length] === "L" ? 0 : 1];

    if (found === expected) {
      return count + 1;
    }

    return f(expected, found, command, instruction, count + 1);
  });
  return trampoline(f(expected, current, command, instruction, count));
}

const dataTest = `
RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)
`;

const dataTest2 = `
LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)
`;

const data = `
LRLLRRRLRRLRRRLRLRRLLRRLRRLRRLRRRLLRRLRRLLLRRLLRRRLRRRLRRRLRLRRRLRRRLRLRLRRLRLRRRLRLRLRRRLLRRRLRLRRLLLRRRLLRRLLLRRRLRRLLRLRLRRRLRRLLRRLRRRLRRRLLRRRLLRRRLRRLRRLRLRRRLLLRRRLRRRLRLRRLRRLRRLRRLRRLRRRLRRRLRRLLRRLRRRLRLLRLLRRLLRRLRRRLRRRLRRRLRRRLRRLRRRLLRRLRRRLRRLRRRLRRLRRLRRLRRLRRLRLRRRR

QRX = (XNN, TCJ)
GSM = (PNH, BVG)
VDX = (VSG, ZZZ)
TGV = (SHD, FVB)
PPH = (MLX, CBT)
GRP = (FGH, VLK)
NCT = (TRH, GJX)
TLD = (QHH, RXL)
XMB = (XXT, XSF)
HQP = (GMB, JGX)
NTH = (BRV, GKL)
RHM = (HJH, BGS)
DPC = (VRX, XTK)
SBD = (GBD, CCG)
NBB = (CGT, DHB)
GXR = (PPM, PSD)
FNR = (KNV, STN)
FRM = (SBD, LPJ)
JMB = (SPN, VPX)
RMJ = (CBT, MLX)
XXD = (HPP, TML)
LJQ = (LTQ, HKH)
LJP = (SSL, SSL)
CFM = (TMR, SJX)
MLX = (TLV, BTH)
LLJ = (SPB, JPL)
VRX = (VLJ, MFX)
XHM = (GSJ, SMV)
CDQ = (MSF, BKM)
LJT = (VMB, XND)
DNF = (QVQ, TTG)
BLB = (VGV, FJC)
FXK = (HBS, DTS)
VDT = (PGC, GSB)
GFS = (QXK, GFC)
LGT = (LVX, LKD)
XRJ = (RXB, XXR)
GRT = (RFK, TMX)
HLK = (QBQ, HPH)
SCK = (LBL, XXD)
LMR = (TLD, RJD)
BRP = (XNX, MXV)
CVV = (NRD, JRP)
VPH = (BRV, GKL)
XSD = (NQC, QNV)
BPT = (QPQ, PJJ)
SQG = (GPB, RQG)
SXL = (VTV, HXR)
FMG = (DVX, DGL)
JQF = (LTJ, LTJ)
HHC = (BPC, VBM)
TFJ = (DLL, KRC)
QTM = (XDK, HXS)
HBV = (GHX, CSL)
HXS = (PJS, JNQ)
TTG = (JGQ, NHL)
FQN = (LDJ, KSP)
NND = (CFK, TCL)
DGP = (NGP, XMP)
FSN = (QKR, HFM)
FDG = (SRF, PBL)
PFN = (LRX, CLT)
VSX = (TCV, SPP)
GRB = (CVR, SJM)
JXP = (JRJ, SCX)
DTF = (BGR, DRD)
JPL = (DFQ, LVC)
HKJ = (RKH, BKZ)
TRQ = (PMT, PMT)
KTG = (TVL, HRP)
LFM = (PSG, FXX)
FHK = (FHT, NVG)
FTD = (QFB, GHT)
SKX = (NGD, LDC)
XTB = (GMB, JGX)
CQK = (TVL, HRP)
NRD = (GDF, SCN)
GBD = (SFQ, VLX)
GTP = (SNQ, MDX)
PDT = (JVS, XSK)
QRJ = (GFS, NSS)
SXD = (JDV, THC)
TCR = (NPR, BGX)
DGL = (LPL, HGH)
SHQ = (JSB, FMG)
BKZ = (VBJ, RFJ)
LVX = (BQV, QGT)
SRH = (PGC, GSB)
KJR = (FQX, DCN)
PGV = (JVB, BDB)
BVG = (LFM, CSX)
KDJ = (BMV, LLS)
JNX = (DSF, CDL)
QGT = (TKL, TQX)
PKK = (VDM, VND)
DHS = (TGG, XCD)
LKD = (QGT, BQV)
HGH = (JQF, RXQ)
GCK = (SHQ, RGG)
JCQ = (HNF, NMR)
XMT = (TRK, KPK)
CJC = (HKV, HKV)
XFM = (QBQ, HPH)
BRQ = (LKT, SCK)
VSG = (XHV, KDJ)
GSJ = (BDR, JNC)
CXJ = (TSD, BGM)
RJX = (PKH, SQB)
HMN = (DJF, RRR)
TKL = (GXV, SQG)
QVJ = (FKN, XPL)
CLT = (TLR, CGG)
HPP = (NXB, KPC)
RGG = (JSB, FMG)
VQC = (LPJ, SBD)
FQL = (PJJ, QPQ)
QKR = (KJR, HMS)
RFK = (PKN, KLG)
QDH = (HRG, HRG)
KKG = (LHV, PCM)
PBF = (NDM, XXM)
XVG = (NDM, XXM)
BGX = (HMN, RLL)
DKL = (XXR, RXB)
MFK = (CJM, GSM)
JLP = (CKC, VKB)
TSD = (TCR, BBD)
KLG = (CQK, KTG)
XCD = (NQG, CDF)
HXR = (JXH, BTG)
FQH = (PQL, MBC)
HBS = (TXL, LCP)
DCV = (TFJ, JDN)
QDK = (PCV, MBQ)
LDJ = (QDK, XHH)
HHB = (NXX, BNL)
SCH = (MDJ, HDC)
BBJ = (MDN, HTD)
BGL = (QVJ, KLR)
VBF = (MTQ, LPH)
CQG = (VLK, FGH)
PQH = (JRN, JPB)
VGV = (HHR, LFH)
CRK = (XFQ, GCK)
VVX = (RKX, VBF)
GDF = (FHF, BJP)
LHF = (MSF, BKM)
MBQ = (VMX, RCD)
JRJ = (NMC, RRN)
CFD = (NVQ, RJX)
MPB = (MPD, VNN)
JPQ = (SJB, CFM)
NCB = (KLR, QVJ)
CVR = (PDT, VNP)
QGF = (JKG, BBS)
KCG = (FSN, KJZ)
DRD = (QXX, JSG)
TCV = (SRH, VDT)
QRM = (KKG, TFR)
GNX = (KDG, PNT)
KBM = (LJQ, RNN)
GDT = (QSG, DGN)
HJH = (VVX, LXP)
GSB = (MKQ, GRF)
CVG = (PLD, CXJ)
QJK = (DNX, DBM)
DDX = (XVG, PBF)
DBM = (XSD, TJF)
NGP = (GJM, VFJ)
FFF = (RQX, BSG)
VXH = (BNL, NXX)
GTQ = (PCL, NBK)
NDM = (XPK, RTX)
BPC = (KCM, FTD)
GVJ = (CMS, HTJ)
TML = (NXB, KPC)
SPB = (DFQ, LVC)
SMV = (JNC, BDR)
PBG = (KGB, JRC)
JGF = (HHC, LXT)
VXF = (GVQ, BXG)
PRL = (XKB, XDL)
TXL = (QTM, MPN)
FHP = (JVB, BDB)
FXX = (PGV, FHP)
QPD = (XFQ, GCK)
PKH = (VSX, MCT)
VLX = (GBR, MBR)
MXV = (LJT, DKB)
QPQ = (FTM, XGT)
PMB = (QRJ, SGV)
DJF = (CQR, CRB)
MRV = (RHM, HGD)
SBT = (GRB, NSJ)
PRT = (QPS, KSG)
HMS = (FQX, DCN)
QFF = (XMT, TDJ)
KVB = (CMS, HTJ)
GJM = (MHV, GDT)
BRX = (MXN, DRG)
CFL = (DNX, DBM)
VGA = (QGF, MRL)
GFQ = (RLF, MBT)
LVJ = (MLL, RDP)
QSM = (PFN, LND)
KQX = (XLH, FNM)
XVB = (GLL, NNP)
JRN = (FPP, QTD)
NMR = (PKM, XMG)
PPM = (CJJ, JPQ)
QLF = (CJC, XMX)
CGJ = (KBG, BRP)
QPT = (MTM, VMQ)
FMV = (BRP, KBG)
GHP = (BGF, TDF)
TPL = (KKV, JHV)
KLR = (FKN, XPL)
KSP = (QDK, XHH)
JVB = (TDC, JLG)
BMV = (XJR, KMK)
VRH = (GTQ, QCS)
KLT = (KQK, VRH)
PLM = (HXG, XRS)
DVX = (LPL, HGH)
LPG = (FMV, CGJ)
XHH = (MBQ, PCV)
LHJ = (MHD, FFF)
FGH = (DVT, NTJ)
BRJ = (PXV, FXK)
DTL = (VBV, FDG)
JDV = (KGL, MFB)
TDC = (PNM, QLF)
PSG = (FHP, PGV)
VMQ = (DBR, BBJ)
CCK = (SKN, NNQ)
GGM = (KKV, JHV)
VXG = (GTP, TMK)
CFK = (QRX, XNV)
BBS = (LVJ, QTB)
XND = (CDQ, LHF)
PKR = (DTX, STT)
LXP = (RKX, VBF)
JBN = (SSL, DRH)
HTD = (BGL, NCB)
BXG = (JMB, NXS)
NQG = (XGF, GHQ)
DHL = (BMK, LST)
JGT = (LKD, LVX)
VLJ = (HBV, FQM)
THB = (RHR, PBG)
NLQ = (XQN, VSC)
MTQ = (VMJ, CRS)
SCT = (MRK, CFD)
MFX = (HBV, FQM)
BGM = (BBD, TCR)
CJJ = (SJB, CFM)
FTM = (XCT, JFV)
VVV = (MFT, NLQ)
DSF = (FQN, PJR)
DTS = (TXL, LCP)
JHM = (RLF, MBT)
NJD = (VTV, HXR)
KPC = (RPS, KBB)
QVQ = (NHL, JGQ)
PSD = (JPQ, CJJ)
LJF = (MFK, LQQ)
LMS = (CGT, DHB)
QTB = (MLL, RDP)
NSS = (QXK, GFC)
CDL = (FQN, PJR)
BMK = (TGD, FFS)
RCR = (JXG, QPT)
XDQ = (QRJ, SGV)
RXF = (SGK, NLK)
PKM = (LSH, JNX)
MFB = (XTB, HQP)
VKB = (LCR, GXR)
HNQ = (THC, JDV)
TCJ = (PDF, KVM)
BPP = (PTN, GJB)
XNN = (KVM, PDF)
TVT = (TJB, CPN)
CRS = (LPP, GRT)
BGS = (VVX, LXP)
TGG = (NQG, CDF)
SPN = (LMS, NBB)
FKN = (QKT, TNS)
XVF = (LHM, JFN)
PDF = (XJP, XPM)
CQR = (GHG, JRG)
NDF = (BHX, KHM)
KQP = (MRK, CFD)
MGP = (KHM, BHX)
TBR = (NGK, GQC)
PCL = (JPV, MMH)
HXG = (QFF, DPJ)
FRN = (TTG, QVQ)
NLG = (MHD, FFF)
GLD = (LJP, JBN)
RCD = (CFJ, PST)
BQV = (TKL, TQX)
SJX = (NFB, XCN)
DGQ = (FMV, CGJ)
XPM = (NFM, VVM)
BBN = (KKG, TFR)
MRX = (CBM, FBS)
VBJ = (GTL, NCT)
QMJ = (DTX, STT)
BFD = (BMR, CNH)
VVM = (PKR, QMJ)
VNP = (XSK, JVS)
HKP = (BRX, BBQ)
TMK = (SNQ, MDX)
GNV = (PFN, LND)
NQC = (SXL, NJD)
NGD = (DGR, BLX)
MPN = (XDK, HXS)
MCT = (TCV, SPP)
XPL = (QKT, TNS)
HQV = (XHT, DCC)
NSJ = (CVR, SJM)
XHV = (LLS, BMV)
HMF = (RNN, LJQ)
TDF = (HMF, KBM)
MHV = (DGN, QSG)
JXG = (MTM, VMQ)
DTX = (CRK, QPD)
RQD = (NQD, TNQ)
RFJ = (GTL, NCT)
CGH = (FHT, NVG)
RJD = (QHH, RXL)
PCV = (VMX, RCD)
LPH = (VMJ, CRS)
QTN = (VNN, MPD)
DFQ = (VRT, SPT)
LPP = (TMX, RFK)
VHJ = (VPD, JCQ)
XSF = (BRF, TSF)
GMB = (PRL, TPH)
VGR = (BMR, CNH)
JGQ = (GHP, PVG)
CFJ = (JHM, GFQ)
FQX = (QTN, MPB)
LJV = (NMH, HKB)
SVJ = (KVB, GVJ)
QCC = (XMP, NGP)
JLG = (PNM, QLF)
MHD = (BSG, RQX)
RNN = (LTQ, HKH)
MPD = (DQF, FTF)
RKH = (RFJ, VBJ)
QBQ = (QCC, DGP)
RKR = (LSB, GNX)
HRP = (RSD, HKP)
NXX = (TNL, TJD)
CHG = (CMC, LLJ)
JVS = (SCH, GMQ)
STT = (CRK, QPD)
LRX = (CGG, TLR)
SSL = (TRQ, TRQ)
SSM = (NND, KLF)
XPK = (FQL, BPT)
QXX = (DPC, QLD)
QCS = (NBK, PCL)
TSF = (VGR, BFD)
LBL = (HPP, TML)
XQN = (BRJ, RJK)
NGX = (KXN, SKX)
DKS = (JFK, XVP)
TGD = (KHF, GXM)
JRX = (PBG, RHR)
CPC = (XQM, FCB)
JSG = (QLD, DPC)
QTD = (FPJ, CVG)
DBR = (HTD, MDN)
DQF = (XSG, GCM)
DTB = (SNF, SVJ)
QFB = (PJQ, KQX)
FCP = (RSC, BFH)
BSG = (QMT, DTB)
JJF = (TMK, GTP)
CCG = (SFQ, VLX)
XSG = (GMS, HGC)
VTN = (BJV, SLG)
TRH = (MQT, FMJ)
TPH = (XDL, XKB)
GXC = (BDM, SBT)
DGN = (MHC, XMB)
XCN = (XPS, TVT)
XLM = (MFT, NLQ)
LVC = (VRT, SPT)
TDX = (HKB, NMH)
XNX = (LJT, DKB)
DGR = (BSC, PRT)
TJF = (NQC, QNV)
QNV = (NJD, SXL)
RDP = (DHL, PDV)
CLX = (LKT, SCK)
LKT = (LBL, XXD)
FMS = (JXP, FFX)
FHB = (CBM, FBS)
CRB = (GHG, JRG)
GHX = (LPG, DGQ)
FPJ = (PLD, CXJ)
RLJ = (KQP, SCT)
LTQ = (KPS, NQM)
VFJ = (MHV, GDT)
KLF = (CFK, TCL)
LTJ = (VTN, VTN)
JRP = (GDF, SCN)
SCX = (RRN, NMC)
CMS = (JJF, VXG)
KJZ = (HFM, QKR)
VNN = (FTF, DQF)
MXN = (RNP, SFL)
LDC = (DGR, BLX)
BBQ = (DRG, MXN)
KBJ = (KNH, NFN)
KQG = (FDG, VBV)
CBT = (BTH, TLV)
RCF = (LQQ, MFK)
CNH = (LGT, JGT)
XRS = (DPJ, QFF)
LPJ = (CCG, GBD)
SCN = (FHF, BJP)
NVG = (BHM, SSM)
DVL = (CLX, BRQ)
CPN = (DKS, HQT)
SPC = (FRM, VQC)
KQH = (JXP, FFX)
VRT = (HQV, BLR)
HDX = (LJF, RCF)
XXR = (CVD, HNC)
GVQ = (NXS, JMB)
SNQ = (CHG, CKK)
FPH = (PQL, MBC)
PBK = (SSB, DTF)
LPL = (JQF, JQF)
VQL = (KXN, SKX)
VMB = (LHF, CDQ)
FNM = (RQD, DFT)
BLX = (BSC, PRT)
PVG = (BGF, TDF)
HPH = (DGP, QCC)
PKT = (FJC, VGV)
KNV = (VBP, KDQ)
PJS = (NBP, XHM)
XNZ = (JLP, NQP)
BJV = (SRJ, QNM)
CBM = (PBK, LXX)
QSX = (SFS, JSV)
VFR = (RSC, BFH)
QSG = (MHC, XMB)
KQK = (QCS, GTQ)
XXM = (RTX, XPK)
JPB = (FPP, QTD)
DRH = (TRQ, BRB)
MSJ = (RKH, RKH)
MRK = (RJX, NVQ)
RSD = (BRX, BBQ)
FBS = (PBK, LXX)
FMB = (MSJ, MSJ)
BJP = (RQQ, TBR)
GTL = (GJX, TRH)
GMQ = (HDC, MDJ)
GCM = (HGC, GMS)
PJJ = (FTM, XGT)
AAA = (XHV, KDJ)
VBP = (MVX, DDX)
SQB = (VSX, MCT)
XFQ = (RGG, SHQ)
RQG = (JVH, LMR)
GXM = (FHB, MRX)
QKT = (JRX, THB)
RLF = (QSX, QKN)
PMT = (NQP, JLP)
PNM = (CJC, XMX)
SNF = (GVJ, KVB)
XJP = (VVM, NFM)
NFN = (FQH, FPH)
BJG = (QPT, JXG)
PST = (JHM, GFQ)
RXB = (HNC, CVD)
XNH = (KKB, PQZ)
DRG = (SFL, RNP)
MRB = (DSM, JVQ)
SJB = (SJX, TMR)
BMR = (JGT, LGT)
LND = (LRX, CLT)
MBC = (KPV, RLJ)
XHT = (CGH, FHK)
XPS = (CPN, TJB)
RRR = (CQR, CRB)
GPB = (JVH, LMR)
PTN = (GNV, QSM)
DHB = (CCK, NJF)
XGV = (RCF, LJF)
THC = (KGL, MFB)
JSV = (MGP, NDF)
XLH = (RQD, DFT)
PXV = (HBS, DTS)
FMJ = (SKG, XVB)
SKG = (GLL, NNP)
VBM = (KCM, FTD)
BHX = (STC, GLD)
RPS = (HNQ, SXD)
TNS = (THB, JRX)
PJR = (KSP, LDJ)
PGJ = (DSM, JVQ)
BHM = (NND, KLF)
BDR = (VXH, HHB)
JVQ = (PNV, JGF)
NQM = (FMB, QKV)
VDM = (XGV, HDX)
XNV = (XNN, TCJ)
SRF = (CVV, JSJ)
FHF = (RQQ, TBR)
TMX = (PKN, KLG)
HNF = (PKM, XMG)
HKH = (KPS, NQM)
JFN = (VXM, GXC)
TMR = (XCN, NFB)
CDF = (XGF, GHQ)
DCN = (QTN, MPB)
HKV = (DNM, DNM)
XRT = (LHM, JFN)
JGX = (PRL, TPH)
LFH = (RPX, PQH)
RLL = (DJF, RRR)
NLK = (PPH, RMJ)
JNQ = (XHM, NBP)
RXL = (HCB, KLT)
FFX = (JRJ, SCX)
JVH = (TLD, RJD)
JRC = (FNR, TSV)
KHF = (MRX, FHB)
HPT = (BXG, GVQ)
PLD = (TSD, BGM)
VND = (XGV, HDX)
GKL = (XFF, BTT)
VSC = (BRJ, RJK)
KTM = (GJB, PTN)
NMH = (XBG, VHJ)
KPS = (FMB, FMB)
XTK = (VLJ, MFX)
HDC = (HQS, MNP)
TRK = (FCP, VFR)
MKQ = (GJT, DVL)
CGG = (FMS, KQH)
XSK = (GMQ, SCH)
JJX = (TGG, XCD)
QKN = (SFS, JSV)
RPX = (JPB, JRN)
JXH = (QDH, QDH)
GHT = (KQX, PJQ)
XCT = (TGV, QNN)
BDM = (NSJ, GRB)
MMH = (NGX, VQL)
FVB = (PMB, XDQ)
NGK = (TDX, LJV)
QNM = (VVV, XLM)
TLR = (FMS, KQH)
VPX = (LMS, NBB)
PJQ = (FNM, XLH)
FHT = (BHM, SSM)
TJQ = (LSB, GNX)
LLS = (XJR, KMK)
JFV = (QNN, TGV)
LHA = (RFJ, VBJ)
LHM = (GXC, VXM)
RHA = (NQP, JLP)
JHV = (LVK, DCV)
XGF = (SPC, SNP)
LSH = (CDL, DSF)
KXN = (LDC, NGD)
XMP = (VFJ, GJM)
BDB = (TDC, JLG)
DVT = (PKT, BLB)
KPV = (SCT, KQP)
GLL = (BJG, RCR)
LSK = (DNM, XNH)
KRC = (DNF, FRN)
TQX = (SQG, GXV)
GQC = (LJV, TDX)
FFS = (KHF, GXM)
SRJ = (VVV, XLM)
TJD = (NTH, VPH)
LHV = (DHS, JJX)
FQM = (CSL, GHX)
CSL = (DGQ, LPG)
PCM = (DHS, JJX)
GJX = (FMJ, MQT)
DTV = (KQG, DTL)
RHC = (PVR, PKK)
RKX = (LPH, MTQ)
KGB = (FNR, TSV)
XQM = (HPT, VXF)
MGV = (KNH, NFN)
KSG = (KCL, KCG)
TSV = (STN, KNV)
SLG = (SRJ, QNM)
MBT = (QSX, QKN)
BTG = (QDH, LXB)
GXV = (RQG, GPB)
BTH = (BPP, KTM)
NVQ = (PKH, SQB)
MDN = (NCB, BGL)
PKN = (KTG, CQK)
LXB = (HRG, VDX)
NVT = (HXG, XRS)
QNN = (FVB, SHD)
KVM = (XJP, XPM)
VPD = (HNF, NMR)
MRL = (JKG, BBS)
SGV = (GFS, NSS)
KGL = (XTB, HQP)
XGT = (JFV, XCT)
HKB = (XBG, VHJ)
CMC = (JPL, SPB)
TDJ = (TRK, KPK)
XLZ = (SLG, BJV)
CHX = (GGM, TPL)
KDQ = (DDX, MVX)
HFM = (KJR, HMS)
RQX = (QMT, DTB)
KQR = (HGD, RHM)
XBG = (JCQ, VPD)
JPV = (NGX, VQL)
VMX = (PST, CFJ)
XXT = (TSF, BRF)
TLV = (KTM, BPP)
DCC = (FHK, CGH)
XVP = (XRJ, DKL)
HCB = (VRH, KQK)
LCP = (MPN, QTM)
CSX = (FXX, PSG)
QKV = (MSJ, HKJ)
KCL = (FSN, FSN)
JNC = (HHB, VXH)
SGK = (RMJ, PPH)
CJM = (BVG, PNH)
MGN = (VTN, XLZ)
HGD = (HJH, BGS)
STN = (VBP, KDQ)
NPR = (RLL, HMN)
RRN = (QRM, BBN)
SHD = (PMB, XDQ)
HQT = (JFK, XVP)
JSB = (DVX, DGL)
TVL = (RSD, HKP)
PBL = (JSJ, CVV)
KBG = (XNX, MXV)
HGN = (NVT, PLM)
BRB = (PMT, XNZ)
XMX = (HKV, LSK)
XMG = (LSH, JNX)
BTT = (LHJ, NLG)
TFR = (LHV, PCM)
MVX = (XVG, PBF)
NBP = (SMV, GSJ)
JDN = (KRC, DLL)
QLD = (VRX, XTK)
MSF = (GHB, RXF)
DPJ = (XMT, TDJ)
SPP = (SRH, VDT)
LQQ = (GSM, CJM)
NBK = (JPV, MMH)
VBV = (SRF, PBL)
GHQ = (SNP, SPC)
SSB = (DRD, BGR)
CVD = (PGJ, MRB)
FPP = (CVG, FPJ)
DFT = (TNQ, NQD)
PQZ = (MRL, QGF)
SKN = (RKR, TJQ)
GMS = (HGN, RPM)
DLL = (FRN, DNF)
LXT = (VBM, BPC)
CVA = (QKR, HFM)
HNC = (PGJ, MRB)
BRV = (XFF, BTT)
RTX = (BPT, FQL)
NQD = (SVS, DTV)
TNQ = (DTV, SVS)
GBR = (RHC, LLN)
XKB = (DRJ, MHF)
NFM = (QMJ, PKR)
XFF = (LHJ, NLG)
TCL = (XNV, QRX)
DRJ = (CFL, QJK)
GJB = (GNV, QSM)
LSB = (PNT, KDG)
PNH = (CSX, LFM)
HRG = (VSG, VSG)
DNX = (TJF, XSD)
KKV = (DCV, LVK)
QHH = (HCB, KLT)
FTF = (XSG, GCM)
NDH = (XQM, FCB)
VXM = (SBT, BDM)
PNV = (LXT, HHC)
KNH = (FPH, FQH)
CKK = (CMC, LLJ)
BBD = (NPR, BGX)
CKC = (LCR, GXR)
PDV = (BMK, LST)
PQL = (RLJ, KPV)
MDX = (CHG, CKK)
BSC = (QPS, QPS)
VLK = (NTJ, DVT)
KDG = (MRV, KQR)
PNT = (MRV, KQR)
TNL = (VPH, NTH)
LLN = (PVR, PKK)
MHC = (XXT, XSF)
QPS = (KCL, KCL)
NNQ = (TJQ, RKR)
NHL = (PVG, GHP)
VMJ = (GRT, LPP)
SFS = (NDF, MGP)
BGR = (QXX, JSG)
QXK = (FQJ, CHX)
DSM = (JGF, PNV)
MBR = (LLN, RHC)
BRF = (VGR, BFD)
NNP = (RCR, BJG)
KKB = (QGF, MRL)
MHF = (QJK, CFL)
MQT = (SKG, XVB)
HTJ = (VXG, JJF)
JRG = (XVF, XRT)
LST = (FFS, TGD)
KPK = (FCP, VFR)
MLL = (DHL, PDV)
NMC = (BBN, QRM)
LDA = (BJV, SLG)
RHR = (JRC, KGB)
PVR = (VND, VDM)
NXS = (VPX, SPN)
RSC = (CQG, GRP)
PGC = (MKQ, GRF)
FQJ = (GGM, TPL)
HHR = (RPX, PQH)
RPM = (PLM, NVT)
STC = (LJP, JBN)
QMT = (SVJ, SNF)
NXB = (RPS, KBB)
GJT = (BRQ, CLX)
DKB = (VMB, XND)
BNL = (TNL, TJD)
SVS = (DTL, KQG)
GFC = (FQJ, CHX)
SNP = (FRM, VQC)
KCM = (GHT, QFB)
JSJ = (JRP, NRD)
MNP = (HLK, XFM)
BGF = (HMF, KBM)
HQS = (XFM, HLK)
GRF = (DVL, GJT)
HGC = (HGN, RPM)
SFQ = (MBR, GBR)
CGT = (NJF, CCK)
GHG = (XVF, XRT)
NTJ = (PKT, BLB)
NJF = (NNQ, SKN)
SPT = (BLR, HQV)
XJR = (CPC, NDH)
RQQ = (GQC, NGK)
XDL = (DRJ, MHF)
JKG = (QTB, LVJ)
GHB = (SGK, NLK)
KHM = (STC, GLD)
BKM = (GHB, RXF)
BLR = (DCC, XHT)
VTV = (JXH, BTG)
TJB = (DKS, HQT)
FCB = (VXF, HPT)
BFH = (CQG, GRP)
LVK = (TFJ, JDN)
RNP = (MGV, KBJ)
SJM = (VNP, PDT)
NQP = (CKC, VKB)
MDJ = (MNP, HQS)
MFT = (VSC, XQN)
LXX = (SSB, DTF)
JFK = (DKL, XRJ)
LCR = (PSD, PPM)
SFL = (MGV, KBJ)
DNM = (KKB, KKB)
RJK = (FXK, PXV)
KBB = (SXD, HNQ)
MTM = (BBJ, DBR)
NFB = (TVT, XPS)
XDK = (JNQ, PJS)
RXQ = (LTJ, MGN)
ZZZ = (KDJ, XHV)
KMK = (CPC, NDH)
FJC = (HHR, LFH)
`;
