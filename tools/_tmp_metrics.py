import csv
from pathlib import Path
rows=[]
p=Path('feature_enhanced/public/images/album/_analysis/image_metrics.csv')
with p.open() as f:
    r=csv.DictReader(f)
    for row in r:
        row['score']=float(row['score'])
        row['aspect']=float(row['aspect'])
        row['width']=int(row['width'])
        row['height']=int(row['height'])
        rows.append(row)
rows.sort(key=lambda x:x['score'], reverse=True)
print('top_landscape')
count=0
for row in rows:
    if row['aspect']>=1.2:
        print(f"{row['name']}\t{row['width']}x{row['height']}\t{row['score']}")
        count+=1
        if count==40:
            break
print('top_portrait')
count=0
for row in rows:
    if row['aspect']<1.2:
        print(f"{row['name']}\t{row['width']}x{row['height']}\t{row['score']}")
        count+=1
        if count==40:
            break
