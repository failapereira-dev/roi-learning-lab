import os
import shutil

def copy_and_rename():
    base_dir = "/Users/faila/Library/CloudStorage/GoogleDrive-failapereira@gmail.com/My Drive/MOINHOS"
    src_dir = os.path.join(base_dir, "ROI US Slides")
    dst_dir = os.path.join(base_dir, "us", "public", "slides")
    
    os.makedirs(dst_dir, exist_ok=True)
    
    # Mapping of source filenames to destination slide filenames
    mapping = {
        "1_Risk-Assessment-and-Return-on-Investment-ROI-in-Healthcare-Artificial-Intelligence-AI.png": "slide_1_1.png",
        "2_Course-Roadmap-Three-Classes-to-AI-Fluency.png": "slide_1_4.png",
        "3_The-Reality-of-Healthcare-AI-Implementations.png": "slide_1_5.png",
        "4_The-Return-on-Investment-ROI-5-Framework-for-Risk-Assessment.png": "slide_1_8.png",
        "5_US-Healthcare-Regulatory-and-Compliance-Risks.png": "slide_1_9.png",
        "6_The-Anatomy-of-Healthcare-AI-Return-on-Investment-ROI.png": "slide_2_1.png",
        "7_The-Hazard-of-Expected-Adoption.png": "slide_2_2.png",
        "8_Stress-Testing-and-Finding-the-Break-Point.png": "slide_2_5.png",
        "9_The-2-Page-Executive-Business-Case.png": "slide_3_1.png",
        "10_GO-NO-GO-Decision-Governance.png": "slide_3_2.png"
    }
    
    for src_name, dst_name in mapping.items():
        src_path = os.path.join(src_dir, src_name)
        dst_path = os.path.join(dst_dir, dst_name)
        
        if os.path.exists(src_path):
            shutil.copy2(src_path, dst_path)
            print(f"Successfully copied: {src_name} -> {dst_name}")
        else:
            print(f"Error: Source file {src_path} not found.")

if __name__ == "__main__":
    copy_and_rename()
