import boto3
from botocore.client import Config
from botocore.exceptions import ClientError

s3 = boto3.client(
    's3',
    endpoint_url='http://localhost:9100',
    aws_access_key_id='admin',
    aws_secret_access_key='admin123123',
    region_name='us-east-1'
)

bucket_name = 'mybucket'

try:
    s3.head_bucket(Bucket=bucket_name)
    print("Bucket exists")
except ClientError:
    s3.create_bucket(Bucket=bucket_name)
    print("Bucket created")

s3.upload_file('local.txt', bucket_name, 'remote.txt')
print("File uploaded successfully")

response = s3.get_object(Bucket='mybucket', Key='remote.txt')

file_bytes = response['Body'].read()
file_str = file_bytes.decode('utf-8')

print("File content (string):", file_str)
