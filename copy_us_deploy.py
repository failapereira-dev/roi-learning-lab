import os
import shutil
import zipfile

def sync_and_package():
    base_dir = "/Users/faila/Library/CloudStorage/GoogleDrive-failapereira@gmail.com/My Drive/MOINHOS"
    us_dir = os.path.join(base_dir, "us")
    deploy_dir = os.path.join(us_dir, "deploy")
    zip_path = os.path.join(us_dir, "deploy.zip")
    
    # 1. Recreate the deploy directory structure
    if os.path.exists(deploy_dir):
        shutil.rmtree(deploy_dir)
    os.makedirs(deploy_dir, exist_ok=True)
    os.makedirs(os.path.join(deploy_dir, "public"), exist_ok=True)
    
    # 2. Copy backend files
    backend_files = ["server.js", "database.js", "db.json", "package.json"]
    for filename in backend_files:
        src = os.path.join(us_dir, filename)
        dst = os.path.join(deploy_dir, filename)
        if os.path.exists(src):
            shutil.copy2(src, dst)
            print(f"Copied backend file: {filename}")
        else:
            print(f"Warning: {src} not found.")
            
    # 3. Copy frontend files
    frontend_files = ["index.html", "app.js", "styles.css", "Final_Project_Template.docx", "Student_Manual.docx"]
    for filename in frontend_files:
        src = os.path.join(us_dir, "public", filename)
        dst = os.path.join(deploy_dir, "public", filename)
        if os.path.exists(src):
            shutil.copy2(src, dst)
            print(f"Copied frontend file: {filename}")
        else:
            print(f"Warning: {src} not found.")
            
    # Copy slides folder recursively if it exists
    src_slides = os.path.join(us_dir, "public", "slides")
    dst_slides = os.path.join(deploy_dir, "public", "slides")
    if os.path.exists(src_slides):
        shutil.copytree(src_slides, dst_slides)
        print("Copied public/slides folder recursively.")
            
    # 4. Create deploy.zip from the us/deploy folder
    print(f"Zipping {deploy_dir} into {zip_path}...")
    with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zip_ref:
        for root, dirs, files in os.walk(deploy_dir):
            for file in files:
                full_path = os.path.join(root, file)
                rel_path = os.path.relpath(full_path, deploy_dir)
                zip_ref.write(full_path, rel_path)
                
    print("US Deployment files synchronized and zipped successfully!")

if __name__ == "__main__":
    sync_and_package()
