import os
import shutil
import zipfile

def main():
    workspace_dir = "/Users/faila/Library/CloudStorage/GoogleDrive-failapereira@gmail.com/My Drive/MOINHOS"
    us_dir = os.path.join(workspace_dir, "us")
    deploy_dir = os.path.join(us_dir, "deploy")
    zip_filename = os.path.join(us_dir, "deploy.zip")
    
    # 1. Recreate clean deploy directory
    if os.path.exists(deploy_dir):
        shutil.rmtree(deploy_dir)
    os.makedirs(deploy_dir)
    
    # 2. Copy files to deploy directory
    files_to_copy = ["server.js", "database.js", "package.json", "db.json"]
    for filename in files_to_copy:
        src = os.path.join(us_dir, filename)
        dst = os.path.join(deploy_dir, filename)
        if os.path.exists(src):
            shutil.copy2(src, dst)
            print(f"Copied file: {filename}")
            
    # Copy public folder
    src_public = os.path.join(us_dir, "public")
    dst_public = os.path.join(deploy_dir, "public")
    if os.path.exists(src_public):
        shutil.copytree(src_public, dst_public, ignore=shutil.ignore_patterns('.DS_Store'))
        print("Copied public folder")
        
    # 3. Create deploy.zip from the deploy/ folder
    print(f"Creating US deployment package: {zip_filename}")
    with zipfile.ZipFile(zip_filename, 'w', zipfile.ZIP_DEFLATED) as zip_ref:
        for root, dirs, files in os.walk(deploy_dir):
            for file in files:
                full_path = os.path.join(root, file)
                rel_path = os.path.relpath(full_path, deploy_dir)
                zip_ref.write(full_path, rel_path)
                
    print("US Deployment package successfully created!")

if __name__ == "__main__":
    main()
