from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Movie
from .serializers import MovieSerializer
from rest_framework.parsers import MultiPartParser, FormParser

class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    parser_classes = (MultiPartParser, FormParser) 

    def create(self, request, *args, **kwargs):
        """ Custom create method to debug file upload issues """
        print("Received request data:", request.data)

        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            try:
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except Exception as e:
                print("Error saving movie:", str(e))
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            print("Validation Errors:", serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)